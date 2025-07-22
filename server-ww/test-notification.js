/**
 * 测试通知功能
 */
const db = require("./utils/mysql");

async function testNotification() {
  try {
    console.log("开始测试通知功能...");

    // 1. 检查notifications表是否存在
    const tableCheck = await db.query(`
      SELECT COUNT(*) as count 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'notifications'
    `);

    console.log("notifications表存在:", tableCheck[0].count > 0);

    if (tableCheck[0].count === 0) {
      console.log("创建notifications表...");
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS notifications (
          id INT AUTO_INCREMENT PRIMARY KEY COMMENT '通知ID',
          user_id VARCHAR(255) NOT NULL COMMENT '用户ID',
          type VARCHAR(50) COMMENT '通知类型',
          title VARCHAR(255) COMMENT '通知标题',
          content TEXT COMMENT '通知内容',
          related_id INT COMMENT '关联ID',
          related_type VARCHAR(50) COMMENT '关联类型',
          sendFormUserId VARCHAR(255) COMMENT '发送者用户ID',
          is_read BOOLEAN DEFAULT FALSE COMMENT '是否已读',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
          INDEX idx_user_read (user_id, is_read),
          INDEX idx_created_at (created_at)
        ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '通知表'
      `;
      await db.query(createTableSQL);
      console.log("notifications表创建成功");
    }

    // 2. 检查sendFormUserId字段是否存在
    const columnCheck = await db.query(`
      SELECT COUNT(*) as count 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'notifications' 
      AND COLUMN_NAME = 'sendFormUserId'
    `);

    console.log("sendFormUserId字段存在:", columnCheck[0].count > 0);

    if (columnCheck[0].count === 0) {
      console.log("添加sendFormUserId字段...");
      await db.query(`
        ALTER TABLE notifications 
        ADD COLUMN sendFormUserId VARCHAR(255) COMMENT '发送者用户ID'
      `);
      console.log("sendFormUserId字段添加成功");
    }

    // 3. 测试插入通知
    console.log("测试插入通知...");
    const testNotification = {
      user_id: "1",
      type: "test",
      title: "测试通知",
      content: "这是一个测试通知",
      related_id: 1,
      related_type: "test",
      sendFormUserId: "97c931bd-dbdf-6bd5-a945-ae93dc369642",
    };

    const insertResult = await db.query(
      `
      INSERT INTO notifications (user_id, type, title, content, related_id, related_type, sendFormUserId) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        testNotification.user_id,
        testNotification.type,
        testNotification.title,
        testNotification.content,
        testNotification.related_id,
        testNotification.related_type,
        testNotification.sendFormUserId,
      ]
    );

    console.log("通知插入成功，ID:", insertResult.insertId);

    // 4. 查询刚插入的通知
    const notifications = await db.query(
      `
      SELECT * FROM notifications WHERE id = ?
    `,
      [insertResult.insertId]
    );

    console.log("查询结果:", notifications[0]);

    // 5. 清理测试数据
    await db.query(
      `
      DELETE FROM notifications WHERE id = ?
    `,
      [insertResult.insertId]
    );

    console.log("测试数据清理完成");
    console.log("✅ 通知功能测试通过！");
  } catch (error) {
    console.error("❌ 通知功能测试失败:", error);
  } finally {
    process.exit(0);
  }
}

// 运行测试
testNotification();
