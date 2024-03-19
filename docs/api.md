# 大作业API文档

示例文档

## 简介

本文档旨在描述即时通讯系统的后端API接口规范，包括用户管理、消息发送、会话管理等功能的接口定义。本系统支持用户注册、登录、好友管理、一对一聊天和群聊功能，确保消息的实时性和数据的完整性。

## 用户管理

### 用户注册

- **接口说明**：用户注册接口，用于新用户创建账户。
- **请求方式**：POST
- **请求地址**：`/api/user/register`
- **请求参数**：

```json
{
  "username": "string", // 用户名
  "password": "string", // 密码
  "email": "string", // 邮箱
  "phone": "string" // 手机号
}
```

- **返回结果**：

```json
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "userId": "string" // 用户唯一标识
  }
}
```

### 用户登录

- **接口说明**：用户登录接口，用于用户登录系统。
- **请求方式**：POST
- **请求地址**：`/api/user/register`
- **请求参数**：

```json
{
  "username": "string", // 用户名
  "password": "string" // 密码
}
```

- **返回结果**：

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "string" // 登录凭证
  }
}
```

## 会话管理

### 创建群聊

- **接口说明**：用于创建一个新的群聊会话。
- **请求方式**：POST
- **请求地址**：`/api/conversation/createGroup`
- **请求参数**：

```json
{
  "userId": "string", // 创建群聊的用户ID
  "memberIds": ["string"], // 群聊成员ID列表
  "groupName": "string" // 群聊名称
}
```

- **返回结果**：

```json
{
  "code": 200,
  "message": "群聊创建成功",
  "data": {
    "groupId": "string" // 群聊唯一标识
  }
}
```

### 发送消息

- **接口说明**：用于在会话中发送消息。
- **请求方式**：POST
- **请求地址**：`/api/message/send`
- **请求参数**：

```json
{
  "senderId": "string", // 发送者ID
  "conversationId": "string", // 会话ID
  "messageType": "string", // 消息类型（如text, image, video）
  "content": "string" // 消息内容
}
```

- **返回结果**：

```json
{
  "code": 200,
  "message": "消息发送成功",
  "data": {
    "messageId": "string" // 消息唯一标识
  }
}
```

## 好友管理

### 添加好友

- **接口说明**：用户添加好友接口。
- **请求方式**：POST
- **请求地址**：`/api/friend/add`
- **请求参数**：

```json
{
  "userId": "string", // 用户ID
  "friendId": "string" // 待添加的好友ID
}
```

- **返回结果**：

```json
{
  "code": 200,
  "message": "好友请求已发送"
}
```

## 错误码

本API文档中的返回结果中的code字段表示请求的处理结果，常见的错误码如下：

- `200`：请求处理成功
- `400`：请求参数错误
- `401`：认证失败，例如未登录或token过期
- `403`：没有权限进行