/**
 * 聊天服务
 * 处理聊天消息的存储、转发和管理
 */

const db = require("../../utils/mysql");

class ChatService {
  constructor() {
    this.initDatabase();
  }

  /**
   * 初始化数据库表
   */
  async initDatabase() {
    // 创建聊天消息表
    const createChatMessagesTable = `
      CREATE TABLE IF NOT EXISTS chat_messages (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        from_user_id VARCHAR(50) NOT NULL COMMENT '发送者用户ID',
        to_user_id VARCHAR(50) NOT NULL COMMENT '接收者用户ID',
        content TEXT NOT NULL COMMENT '消息内容',
        message_type ENUM('text', 'image', 'file', 'system') DEFAULT 'text' COMMENT '消息类型',
        is_read TINYINT(1) DEFAULT 0 COMMENT '是否已读',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        INDEX idx_from_user (from_user_id),
        INDEX idx_to_user (to_user_id),
        INDEX idx_conversation (from_user_id, to_user_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='聊天消息表'
    `;

    // 创建聊天会话表
    const createChatSessionsTable = `
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(50) NOT NULL COMMENT '用户ID',
        target_user_id VARCHAR(50) NOT NULL COMMENT '目标用户ID',
        last_message TEXT COMMENT '最后一条消息内容',
        last_message_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '最后消息时间',
        unread_count INT DEFAULT 0 COMMENT '未读消息数量',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        UNIQUE KEY unique_conversation (user_id, target_user_id),
        INDEX idx_user_id (user_id),
        INDEX idx_target_user_id (target_user_id),
        INDEX idx_last_message_time (last_message_time)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='聊天会话表'
    `;

    try {
      await db.query(createChatMessagesTable);
      await db.query(createChatSessionsTable);
      console.log("聊天数据库表初始化完成");
    } catch (error) {
      console.error("初始化聊天数据库表失败:", error);
      throw error;
    }
  }

  /**
   * 保存聊天消息
   * @param {Object} messageData 消息数据
   * @returns {Promise<Object>} 保存的消息
   */
  async saveMessage(messageData) {
    const {
      fromUserId,
      toUserId,
      content,
      messageType = "text",
      fromAvatar,
    } = messageData;

    const sql = `
      INSERT INTO chat_messages (from_user_id, to_user_id, content, message_type,fromAvatar)
      VALUES (?, ?, ?, ?, ?)
    `;
    console.log(fromAvatar, "头像--");
    try {
      const result = await db.query(sql, [
        fromUserId,
        toUserId,
        content,
        messageType,
        fromAvatar,
      ]);

      // 处理不同的数据库驱动返回格式
      const insertResult = Array.isArray(result) ? result[0] : result;

      // 更新或创建聊天会话
      await this.updateChatSession(fromUserId, toUserId, content);

      return {
        id: insertResult.insertId,
        fromUserId,
        toUserId,
        content,
        messageType,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("保存聊天消息失败:", error);
      throw error;
    }
  }

  /**
   * 更新聊天会话
   * @param {string} userId 用户ID
   * @param {string} targetUserId 目标用户ID
   * @param {string} lastMessage 最后一条消息
   */
  async updateChatSession(userId, targetUserId, lastMessage) {
    const sql = `
      INSERT INTO chat_sessions (user_id, target_user_id, last_message, last_message_time, unread_count)
      VALUES (?, ?, ?, NOW(), 
        CASE 
          WHEN user_id = ? THEN unread_count 
          ELSE COALESCE(unread_count, 0) + 1 
        END
      )
      ON DUPLICATE KEY UPDATE 
        last_message = VALUES(last_message),
        last_message_time = VALUES(last_message_time),
        unread_count = CASE 
          WHEN user_id = ? THEN unread_count 
          ELSE COALESCE(unread_count, 0) + 1 
        END
    `;

    try {
      await db.query(sql, [userId, targetUserId, lastMessage, userId, userId]);
    } catch (error) {
      console.error("更新聊天会话失败:", error);
    }
  }

  /**
   * 获取聊天历史记录（带发送方昵称和头像）
   * @param {string} userId 用户ID
   * @param {string} targetUserId 目标用户ID
   * @param {number} limit 限制数量
   * @param {number} offset 偏移量
   * @returns {Promise<Array>} 聊天记录
   */
  async getChatHistory(userId, targetUserId, limit = 50, offset = 0) {
    const sql = `
      SELECT 
        m.id,
        m.from_user_id AS fromUserId,
        m.to_user_id AS toUserId,
        m.content,
        m.message_type AS messageType,
        m.is_read AS isRead,
        m.created_at AS createdAt,
        u.nickname AS fromNickname,
        m.fromAvatar
      FROM chat_messages m
      LEFT JOIN user_info u ON m.from_user_id = u.id
      WHERE (m.from_user_id = ? AND m.to_user_id = ?)
         OR (m.from_user_id = ? AND m.to_user_id = ?)
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?
    `;
    try {
      const rows = await db.query(sql, [
        userId,
        targetUserId,
        targetUserId,
        userId,
        limit,
        offset,
      ]);
      console.log(rows, "发送-------");
      return rows.reverse(); // 返回正序
    } catch (error) {
      console.error("获取聊天历史失败:", error);
      return [];
    }
  }

  /**
   * 获取用户的所有聊天会话（实时统计未读数）
   * @param {string} userId 用户ID
   * @returns {Promise<Array>} 聊天会话列表
   */
  async getChatSessions(userId) {
    const sql = `
      SELECT 
        cs.target_user_id AS targetUserId,
        cs.last_message AS lastMessage,
        cs.last_message_time AS lastMessageTime,
        (
          SELECT COUNT(*) 
          FROM chat_messages m 
          WHERE m.from_user_id = cs.target_user_id 
            AND m.to_user_id = cs.user_id 
            AND m.is_read = 0
        ) AS unreadCount
      FROM chat_sessions cs
      WHERE cs.user_id = ?
      ORDER BY cs.last_message_time DESC
    `;

    try {
      const rows = await db.query(sql, [userId]);
      console.log("会话--", rows);
      return rows;
    } catch (error) {
      console.error("获取聊天会话失败:", error);
      return [];
    }
  }

  /**
   * 标记消息为已读
   * @param {string} userId 用户ID
   * @param {string} targetUserId 目标用户ID
   * @returns {Promise<void>}
   */
  async markMessagesAsRead(userId, targetUserId) {
    const updateMessagesSql = `
      UPDATE chat_messages 
      SET is_read = 1 
      WHERE from_user_id = ? AND to_user_id = ? AND is_read = 0
    `;

    const resetUnreadSql = `
      UPDATE chat_sessions 
      SET unread_count = 0 
      WHERE user_id = ? AND target_user_id = ?
    `;

    try {
      await db.query(updateMessagesSql, [targetUserId, userId]);
      await db.query(resetUnreadSql, [userId, targetUserId]);
    } catch (error) {
      console.error("标记已读失败:", error);
      throw error;
    }
  }

  /**
   * 撤回消息
   * @param {string} messageId 消息ID
   * @param {string} userId 用户ID
   * @returns {Promise<boolean>} 是否成功撤回
   */
  async recallMessage(messageId, userId) {
    const sql = `
      UPDATE chat_messages 
      SET content = '你撤回了一条消息', message_type = 'system'
      WHERE id = ? AND from_user_id = ?
    `;

    try {
      const result = await db.query(sql, [messageId, userId]);
      const updateResult = Array.isArray(result) ? result[0] : result;
      return updateResult.affectedRows > 0;
    } catch (error) {
      console.error("撤回消息失败:", error);
      throw error;
    }
  }

  /**
   * 获取未读消息数量
   * @param {string} userId 用户ID
   * @returns {Promise<number>} 未读数量
   */
  async getUnreadCount(userId) {
    const sql = `
      SELECT SUM(unread_count) as total
      FROM chat_sessions 
      WHERE user_id = ?
    `;

    try {
      const rows = await db.query(sql, [userId]);
      console.log(rows, "未读消息----------");
      return rows[0] ? rows[0].total || 0 : 0;
    } catch (error) {
      console.error("获取未读数量失败:", error);
      return 0;
    }
  }

  /**
   * 删除聊天记录
   * @param {string} userId 用户ID
   * @param {string} targetUserId 目标用户ID
   * @returns {Promise<void>}
   */
  async deleteChatHistory(userId, targetUserId) {
    const deleteMessagesSql = `
      DELETE FROM chat_messages 
      WHERE (from_user_id = ? AND to_user_id = ?) 
         OR (from_user_id = ? AND to_user_id = ?)
    `;

    const deleteSessionsSql = `
      DELETE FROM chat_sessions 
      WHERE (user_id = ? AND target_user_id = ?) 
         OR (user_id = ? AND target_user_id = ?)
    `;

    try {
      await db.query(deleteMessagesSql, [
        userId,
        targetUserId,
        targetUserId,
        userId,
      ]);
      await db.query(deleteSessionsSql, [
        userId,
        targetUserId,
        targetUserId,
        userId,
      ]);
    } catch (error) {
      console.error("删除聊天记录失败:", error);
      throw error;
    }
  }
}

module.exports = ChatService;
