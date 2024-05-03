# API 文档

最后更新时间：2024/5/3

## 说明

### 信息认证

​在项目中，验证用户身份的方式是需要携带 JWT 令牌。在接下来的API介绍中，每个有“**需要登录**”标志的API都需要将请求头 `Authorization` 字段设置为 JWT 令牌。

### 成功响应格式

```json
{
  "code": 0,
  "info": "Succeed",
  //* 其他字段 *//
}
```

​	后续的成功响应只提供`data`。

### 错误响应格式

```json
{
  "code": "*",
  "info": "[Some message]"
}
```

​	后续的错误响应提供对应的`code`，`info`和对应的说明。

### HTTP状态码

正确响应的状态码为200，异常返回值如下: 

**400 Bad Request**
这个状态码适用于因为客户端发送的请求有错误导致服务器无法理解或无法处理的情况。通常用于请求的格式错误或者缺失必要信息。

**401 Unauthorized**
适用于那些请求需要用户的验证，而请求中并没有提供验证信息，或者验证信息无效的情况。

**403 Forbidden**
当服务器理解请求但是拒绝执行时使用。通常用于权限不足的情况。

**404 Not Found**
当请求的资源不存在时使用，例如请求的用户、文件或页面不存在。

**405 Method Not Allowed**
用于请求的方法（GET, POST等）不被允许时。确保在响应中提供Allow头，列出允许的方法。

**409 Conflict**
适用于请求的操作会引起冲突，如尝试创建已经存在的资源，或者请求的操作在当前资源的状态下不允许。

### 错误码

通用

| 错误码 | 状态码 | Info                | 说明         |
| ------ | ------ | ------------------- | ------------ |
| 1      | 401    | User not logged in  | 用户未登录   |
| 2      | 404    | User does not exist | 用户不存在   |
| 3      | 400    | Invalid request     | 请求无效     |
| *      | 405    | Method Not Allowed  | 方法不被允许 |
*统一采用django自带的错误返回，无错误码

用户管理

| 错误码 | 状态码 | Info                    | 说明         |
| ------ | ------ | ----------------------- | ------------ |
| 10     | 409    | Username already exists | 用户名已存在 |
| 11     | 400    | Invalid username        | 用户名无效   |
| 12     | 400    | Invalid password        | 密码无效     |
| 13     | 400    | Invalid email           | 邮箱地址无效 |
| 14     | 400    | Invalid phone           | 电话号码无效 |
| 15     | 403    | Incorrect password      | 密码错误     |

好友管理

| 错误码 | 状态码 | Info                        | 说明               |
| ------ | ------ | --------------------------- | ------------------ |
| 20     | 404    | User not found              | 用户未找到         |
| 21     | 404    | Request not found           | 请求未找到         |
| 22     | 404    | Friend not found            | 好友未找到         |
| 23     | 400    | Cannot send request to self | 不能向自己发送请求 |
| 24     | 409    | Already friends             | 已经是好友了       |
| 25     | 409    | Request already sent        | 请求已发送         |
| 26     | 409    | Not friends                 | 不是好友           |
| 27     | 400    | Invalid friend group name   | 好友分组名无效     |

会话

| 错误码 | 状态码 | Info                     | 说明           |
| ------ | ------ | ------------------------ | -------------- |
| 30     | 404    | Conversation not found   | 会话未找到     |
| 31     | 404    | Member not found         | 成员未找到     |
| 32     | 404    | Message not found        | 消息未找到     |
| 33     | 403    | User not in conversation | 用户不在会话中 |

群聊

| 错误码 | 状态码 | Info                | 说明             |
| ------ | ------ | ------------------- | ---------------- |
| 40     | 404    | Group not found     | 群聊未找到       |
| 41     | 403    | User not authorized | 用户无权限       |
| 42     | 403    | Member not admin    | 成员不是管理员   |
| 43     | 403    | Not in group        | 不在群聊中       |
| 44     | 403    | Cannot remove self  | 不能移除自己     |
| 45     | 403    | Cannot remove owner | 不能移除群主     |
| 46     | 403    | Cannot remove admin | 不能移除管理员   |
| 47     | 403    | Owner cannot quit   | 群主不能退出群聊 |
| 48     | 409    | Already owner       | 已是群主         |
| 49     | 409    | Already admin       | 已是管理员       |

群聊邀请

| 错误码 | 状态码 | Info                    | 说明       |
| ------ | ------ | ----------------------- | ---------- |
| 50     | 409    | Invitation already sent | 邀请已发送 |
| 51     | 404    | Invitation not found    | 邀请未找到 |


## 用户管理

### 用户注册

-  **URL**: /user/register

- **接口说明**: 用于新用户创建账户。

- **请求方式**: POST

- **请求体**: 

```json
{
  "username": "Alice", 
  "password": "123456", 
  "email": "example@example.com", 
  "phone": "1234567890" 
}
```

上述字段的说明为: 

- `userName`。表示用户名，应当为非空字符串，且长度不大于 20,不能与其他用户重复。
- `password`。表示用户的密码，应当为非空字符串，且长度不大于 20。
- `email`: 表示用户的电子邮件地址，应当为非空字符串，且符合标准的电子邮件地址格式，长度不应超过 50 个字符。
- `phone`: 表示用户的手机号码，应当为非空字符串，且只包含数字字符，长度不应超过 20 个字符。

- **成功响应**

```json
//
```

- **错误响应**

| 错误码 | 状态码 | Info                    | 说明         |
| ------ | ------ | ----------------------- | ------------ |
| 10     | 409    | Username already exists | 用户名已存在 |
| 11     | 400    | Invalid username        | 用户名无效   |
| 12     | 400    | Invalid password        | 密码无效     |
| 13     | 400    | Invalid email           | 邮箱地址无效 |
| 14     | 400    | Invalid phone           | 电话号码无效 |

### 用户注销

> [!NOTE]
>
> 需要登录

-  **URL**: /user/logoff

- **接口说明**: 用于用户注销账户。

- **请求方式**: POST

- **请求体**: 

```json
{
  "password": "123456", 
}
```

- 需要提供密码进行验证。

- **成功响应**

```json
//
```

- **错误响应**

| 错误码 | 状态码 | Info               | 说明       |
| ------ | ------ | ------------------ | ---------- |
| 1      | 401    | User not logged in | 用户未登录 |
| 15     | 403    | Incorrect password | 密码错误   |

### 用户登录

-  **URL**: /user/login

- **接口说明**: 用于用户登录账户。

- **请求方式**: POST

- **请求体**: 

```json
{
  "username": "Alice", 
  "password": "123456"
}
```

- **成功响应**

```json
{
  "token": "***.***.***"  //JWT
}
```

- **错误响应**

| 错误码 | 状态码 | Info                | 说明       |
| ------ | ------ | ------------------- | ---------- |
| 2      | 404    | User does not exist | 用户不存在 |
| 15     | 403    | Incorrect password  | 密码错误   |

## 编辑信息

> [!NOTE]
>
> 需要登录

### 普通信息修改

- **URL**: /user/update_normal_info

- **接口说明**: 用于用户修改个人用户普通信息。

- **请求方法**: PUT

- **请求体**: 

```json
{
  "avatar_base64": "**"
}
```

- `avatar_base64`表示用户头像的base64编码。

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info               | 说明       |
| ------ | ------ | ------------------ | ---------- |
| 1      | 401    | User not logged in | 用户未登录 |

### 身份认证信息修改

- **URL**: /user/update_auth_info

- **接口说明**: 用于用户修改用户身份认证信息。

- **请求方法**: PUT

- **请求体**: 

```json
{
  "new_password": "123456", 
  "email": "example@example.com", 
  "phone": "1234567890" ,
  "old_password":"1234567"
}
```

- 需要提供旧密码进行验证。

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                    | 说明         |
| ------ | ------ | ----------------------- | ------------ |
| 1      | 401    | User not logged in      | 用户未登录   |
| 10     | 409    | Username already exists | 用户名已存在 |
| 11     | 400    | Invalid username        | 用户名无效   |
| 12     | 400    | Invalid password        | 密码无效     |
| 13     | 400    | Invalid email           | 邮箱地址无效 |
| 14     | 400    | Invalid phone           | 电话号码无效 |
| 15     | 403    | Incorrect password      | 密码错误     |

## 好友管理

> [!NOTE]
>
> 需要登录

### 用户查找

- **URL**: /user/search_friends

- **接口说明**: 用于用户查找其他⽤⼾。

- **请求方法**: GET

- **请求参数**: 

| 参数名  | 必须 | 类型   | 描述                       |
| ------- | ---- | ------ | -------------------------- |
| keyword | 是   | string | 用户用来搜索好友的关键词。 |

- **成功响应**

```json
{
  "data": [
    {
      "user_id": 1,
      "username": "example_user",
      "avatar_base64": "**"
    },
    {
      "user_id": 2,
      "username": "another_user",
      "avatar_base64": "**"
    },
    // ...
  ]
}
```

- **错误响应**:

| 错误码 | 状态码 | Info               | 说明       |
| ------ | ------ | ------------------ | ---------- |
| 1      | 401    | User not logged in | 用户未登录 |

### 用户详情

- **URL**: /user/profile/{user_name}

- **接口说明**: 用于获取特定用户的详细信息。

- **请求方法**: GET

- **成功响应**

```json
{
  "user_id": 1,
  "username": "example_user",
  "email": "example@example.com",
  "phone": "1234567890",
  "avatar_base64": "**",
  "is_friend": 1,
}
```

- **错误响应**:

| 错误码 | 状态码 | Info               | 说明       |
| ------ | ------ | ------------------ | ---------- |
| 1      | 401    | User not logged in | 用户未登录 |
| 20     | 404    | User not found     | 用户未找到 |

### 发送好友申请

- **URL**: /user/send_friend_request

- **接口说明**: 用于用户发送添加好友申请。

- **请求方法**: POST

- **请求体**: 

```json
{
  "friend_id": 1
}
```

- `friend_id`是接收者的用户ID，即申请添加为好友的目标用户的ID

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                        | 说明               |
| ------ | ------ | --------------------------- | ------------------ |
| 1      | 401    | User not logged in          | 用户未登录         |
| 20     | 404    | User not found              | 用户未找到         |
| 23     | 400    | Cannot send request to self | 不能向自己发送请求 |
| 24     | 409    | Already friends             | 已经是好友了       |
| 25     | 409    | Request already sent        | 请求已发送         |

### 查看好友申请

- **URL**: /user/friend_requests

- **接口说明**: 用于用户查看收到的好友申请以及自己发送的好友申请。

- **请求方法**: GET

- **成功响应**

```json
{
  "requests": [
    {
      "request_id": 123,
      "sender_id": 456,
      "sender_name": "SenderUsername",
      "sender_avatar": "http://example.com/avatar.jpg",
      "status": "accept",
      "sent_time": "2024-03-21 12:00:00"
    },
    //...
  ],
    "sent_requests":[
      {
      "request_id": 123,
      "receiver_id": 456,
      "receiver_name": "SenderUsername",
      "receiver_avatar": "http://example.com/avatar.jpg",
      "status": "accept",
      "sent_time": "2024-03-21 12:00:00"
    },
    ]
  
}
```

- `request_id`: 申请ID。
- `sender_id`: 发送者的用户ID。
- `sender_name`: 发送者的用户名。
- `sender_avatar`: 发送者的头像链接。
- `status`:请求状态（待处理/已同意/已拒绝）
- `sent_time`: 申请发送时间。

- **错误响应**:

| 错误码 | 状态码 | Info               | 说明       |
| ------ | ------ | ------------------ | ---------- |
| 1      | 401    | User not logged in | 用户未登录 |

### 回应好友申请

- **URL**: /user/respond_friend_request

- **接口说明**: 用于用户回应好友申请。

- **请求方法**: POST

- **请求体**: 

```json
{
  "request_id": "申请ID",
  "response": "accept" //或 "reject"
}
```

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info               | 说明       |
| ------ | ------ | ------------------ | ---------- |
| 1      | 401    | User not logged in | 用户未登录 |
| 21     | 404    | Request not found  | 请求未找到 |

### 删除好友

- **URL**: /user/delete_friend

- **接口说明**: 用于用户删除好友。

- **请求方法**: POST

- **请求体**: 

```json
{
  "friend_id":"好友ID"
}
```

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info               | 说明       |
| ------ | ------ | ------------------ | ---------- |
| 1      | 401    | User not logged in | 用户未登录 |
| 22     | 404    | Friend not found   | 好友未找到 |
| 26     | 409    | Not friends        | 不是好友   |
好友未找到指这个人不存在，不是好友指这个人存在但不是好友关系

### 获取好友列表

- **URL**: /user/get_friends

- **接口说明**: 用于用户获取所有好友。

- **请求方法**: GET

- **成功响应**

```json
{
  "friends": [
        {
            "friend_id": "好友ID",
            "friend_name": "好友用户名",
            "friend_avatar": "好友头像URL"
        },
    // ...
    ]
}
```

- **错误响应**:

| 错误码 | 状态码 | Info               | 说明       |
| ------ | ------ | ------------------ | ---------- |
| 1      | 401    | User not logged in | 用户未登录 |

### 添加好友到分组

- **URL**: /user/add_friend_to_friend_group

- **接口说明**: 用于用户将好友添加到某一指定的分组。

- **请求方法**: POST

- **请求体**: 

```json
{
  "friend_id": "对方的用户ID",
  "friend_group_id": "分组的ID"
}
```

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                      | 说明           |
| ------ | ------ | ------------------------- | -------------- |
| 1      | 401    | User not logged in        | 用户未登录     |
| 26     | 409    | Not friends               | 不是好友       |
| 27     | 400    | Invalid friend group name | 好友分组名无效 |

## 会话管理

> [!NOTE]
>
> 需要登录

### 获取所有私聊

- **URL**: /user/get_private_conversations

- **接口说明**: 用于用户获取所有的私人聊天。

- **请求方法**: GET

- **成功响应**

```json
{
  "conversations": [
    {
      "conversation_id": "会话ID",
      "is_private": true,
      "friend_id": "对方ID",
      "friend_name": "对方用户名",
      "friend_avatar": "对方头像链接",
      "not_read": "未读消息数目",
      "disabled": "失效标志"
    },
    // ...
  ]
}
```

- **错误响应**:

| 错误码 | 状态码 | Info               | 说明       |
| ------ | ------ | ------------------ | ---------- |
| 1      | 401    | User not logged in | 用户未登录 |

### 发起私聊

- **URL**: /user/create_private_conversation

- **接口说明**: 用于用户获取和某朋友的私聊。

- **请求方法**: POST

- **请求体**: 

```json
{
  "friend_id": "好友id"
}
```

- **成功响应**

```json
{
  "conversation_id": "会话id",
  "friend_id": "好友id",
  "friend_name": "好友用户名",
  "friend_avatar": "好友头像"
}
```

- **错误响应**:

| 错误码 | 状态码 | Info               | 说明       |
| ------ | ------ | ------------------ | ---------- |
| 1      | 401    | User not logged in | 用户未登录 |
| 22     | 404    | Friend not found   | 好友未找到 |
| 26     | 409    | Not friends        | 不是好友   |

### 聊天界面

- **URL**: /user/conversation/{conversation_id}

- **接口说明**: 用于用户获取和某个朋友或群聊的聊天界面。

- **请求方法**: GET

- **成功响应**

```json
{
  "messages": [
    {
      "msg_id": "消息ID",
      "msg_body": "消息体",
      "sender_id": "发送者ID",
      "sender_name": "发送者用户名",
      "sender_avatar": "发送者头像链接",
      "create_time": "创建时间",
      "is_read": "是否已读", // 仅私聊
      "read_by": ["已读用户ID"], // 仅群聊
      "reply_count": "回复次数",
      "reply_to": {
          "msg_id": ,
          "content": ,
          "sender_id": ,
          "sender_name": ,
          "sender_avatar": ,
          "create_time": ,
      } // 如果有回复，显示被回复消息的信息
    },
    // ...
  ]
}
```

- `reply_to`是被回复消息的信息。
- `read_by`是列表，阅读此条消息群成员的id。

- **错误响应**:

| 错误码 | 状态码 | Info                     | 说明           |
| ------ | ------ | ------------------------ | -------------- |
| 1      | 401    | User not logged in       | 用户未登录     |
| 30     | 404    | Conversation not found   | 会话未找到     |
| 31     | 404    | Member not found         | 成员未找到     |
| 33     | 403    | User not in conversation | 用户不在会话中 |
这里成员未找到指用户不存在，之后可能会考虑对方不存在的情况

### 发送消息

- **URL**: /user/send_message

- **接口说明**: 用于用户在某个会话发送消息。

- **请求方法**: POST

- **请求体**: 

```json
{
  "conversation_id": "会话ID",
  "content": "消息内容"
}
```

- **成功响应**

```json
{
  "message_id": "消息ID"
}
```

- **错误响应**:

| 错误码 | 状态码 | Info                     | 说明           |
| ------ | ------ | ------------------------ | -------------- |
| 1      | 401    | User not logged in       | 用户未登录     |
| 30     | 404    | Conversation not found   | 会话未找到     |
| 31     | 404    | Member not found         | 成员未找到     |
| 33     | 403    | User not in conversation | 用户不在会话中 |

### 删除消息

- **URL**: /user/delete_message

- **接口说明**: 用于用户在某个会话中删除一条消息。

- **请求方法**: POST

- **请求体**: 

```json
{
  "conversation_id": "会话ID",
  "message_id": "消息ID"
}
```

- **成功响应**

```json
{
  //
}
```

- **错误响应**:

| 错误码 | 状态码 | Info                     | 说明           |
| ------ | ------ | ------------------------ | -------------- |
| 1      | 401    | User not logged in       | 用户未登录     |
| 30     | 404    | Conversation not found   | 会话未找到     |
| 33     | 403    | User not in conversation | 用户不在会话中 |

### 更新已读状态

- **URL**: /user/mark_as_read/{conversation_id}

- **接口说明**: 用于用户更新某一会话已读状态。

- **请求方法**: POST

- **请求体**: 

```json
//
```

- **成功响应**: 

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                     | 说明           |
| ------ | ------ | ------------------------ | -------------- |
| 1      | 401    | User not logged in       | 用户未登录     |
| 30     | 404    | Conversation not found   | 会话未找到     |
| 33     | 403    | User not in conversation | 用户不在会话中 |

### 查询聊天记录

- **URL**: /user/records/{conversation_id}

- **接口说明**: 用于用户根据时间或成员获取某一会话的所有聊天记录。

- **请求方法**: GET

- URL 参数:

conversation_id（必需）：从中获取消息的会话的id。

- 查询参数：

start_time（可选）：获取消息的时间范围的开始。应采用ISO 8601格式。

end_time（可选）：获取消息的时间范围的结束。应采用ISO 8601格式。

member_id（可选）：用于获取该特定用户发送的消息的成员的id。

- 例子：

GET /user/conversation/1

GET /user/conversation/1?start_time=2023-01-01T00:00:00Z

GET /user/conversation/1?member_id=2

- **成功响应**

```json
{
  "messages": [
    {
      "msg_id": "消息ID",
      "msg_body": "消息体",
      "sender_id": "发送者ID",
      "sender_name": "发送者用户名",
      "sender_avatar": "发送者头像",
      "create_time": "创建时间",
    },
    // ...
  ]
}
```

- **错误响应**:

| 错误码 | 状态码 | Info                     | 说明           |
| ------ | ------ | ------------------------ | -------------- |
| 1      | 401    | User not logged in       | 用户未登录     |
| 30     | 404    | Conversation not found   | 会话未找到     |
| 31     | 404    | Member not found         | 成员未找到     |
| 33     | 403    | User not in conversation | 用户不在会话中 |
这里成员未找到可能是要查找的成员不在会话中。

### 删除聊天记录

- **URL**: /user/delete_records

- **接口说明**: 用于用户删除某一会话的聊天记录。

- **请求方法**: POST

- **请求体**: 

```json
{
  "conversation_id": "会话id"
}
```

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                     | 说明           |
| ------ | ------ | ------------------------ | -------------- |
| 1      | 401    | User not logged in       | 用户未登录     |
| 30     | 404    | Conversation not found   | 会话未找到     |
| 33     | 403    | User not in conversation | 用户不在会话中 |

### 回复消息

- **URL**: /user/reply_message

- **接口说明**: 用于用户在某个会话中回复一条消息。

- **请求方法**: POST

- **请求体**: 

```json
{
  "conversation_id": "会话ID",
  "reply_to_id": "被回复的消息id",
  "content": "新消息内容"
}
```

- **成功响应**

```json
{
  "message_id": "新消息id"
}
```

- **错误响应**:

| 错误码 | 状态码 | Info                     | 说明           |
| ------ | ------ | ------------------------ | -------------- |
| 1      | 401    | User not logged in       | 用户未登录     |
| 32     | 404    | Message not found        | 消息未找到     |
| 33     | 403    | User not in conversation | 用户不在会话中 |


## 群聊管理

> [!NOTE]
>
> 需要登录

### 发起群聊

- **URL**: /user/create_group_conversation

- **接口说明**: 用于用户发起群聊。

- **请求方法**: POST

- **请求体**: 

```json
{
  "members_id": ["用户ID1", "用户ID2", "..."],
  "name": "群聊名称"
}
```

- `members`是列表类型，包含（除用户自身以外）群聊成员的id列表。

- **成功响应**

```json
{
  "conversation_id": "会话ID",
  "name": "群聊名称",
  "members": [{"id": 1, "username": "1"}, {"id": 2, "username": "2"}, {"id": 3, "username": "3"}],
  "owner_id": "群主ID"
}
```

- `members`是列表类型，包括所有群成员的ID和用户名。

- **错误响应**:

| 错误码 | 状态码 | Info                | 说明       |
| ------ | ------ | ------------------- | ---------- |
| 1      | 401    | User not logged in  | 用户未登录 |
| 2      | 404    | User does not exist | 用户不存在 |
| 26     | 409    | Not friends         | 不是好友   |
| 31     | 404    | Member not found    | 成员未找到 |

### 获取所有群聊

- **URL**: /user/get_group_conversation

- **接口说明**: 用于用户获取所有的群聊。

- **请求方法**: GET

- **成功响应**

```json
{
  "conversations": [
    {
      "id": "会话ID",
      "is_private": false,
      "group_name": "群聊名称",
      "group_avatar": "群聊头像链接",
      "not_read": "未读消息数目",
      "disabled": "失效标志"
    },
    // ...
  ]
}
```

- **错误响应**:

| 错误码 | 状态码 | Info               | 说明       |
| ------ | ------ | ------------------ | ---------- |
| 1      | 401    | User not logged in | 用户未登录 |

### 添加管理员

- **URL**: /user/add_admin

- **接口说明**: 用于群主将群成员提升为管理员。

- **请求方法**: POST

- **请求体**: 

```json
{
  "group_id": "群组ID",
  "member_id": "成员ID"
}
```

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                | 说明       |
| ------ | ------ | ------------------- | ---------- |
| 1      | 401    | User not logged in  | 用户未登录 |
| 40     | 404    | Group not found     | 群聊未找到 |
| 31     | 404    | Member not found    | 成员未找到 |
| 41     | 403    | User not authorized | 用户无权限 |
| 49     | 409    | Already admin       | 已是管理员 |

### 移除管理员

- **URL**: /user/remove_admin

- **接口说明**: 用于群主将管理员移除出管理员角色。

- **请求方法**: POST

- **请求体**: 

```json
{
  "group_id": "群组ID",
  "member_id": "要移除管理员的成员ID"
}
```

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                | 说明           |
| ------ | ------ | ------------------- | -------------- |
| 1      | 401    | User not logged in  | 用户未登录     |
| 40     | 404    | Group not found     | 群聊未找到     |
| 41     | 403    | User not authorized | 用户无权限     |
| 42     | 403    | Member not admin    | 成员不是管理员 |
| 43     | 403    | Not in group        | 不在群聊中     |
| 48     | 409    | Already owner       | 已是群主       |

### 转让群主

- **URL**: /user/transfer_owner

- **接口说明**: 用于群主将群的所有权转让给另一个群成员。

- **请求方法**: POST

- **请求体**: 

```json
{
  "group_id": "群组ID",
  "new_owner_id": "新群主ID"
}
```

- **成功响应**

```
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                | 说明       |
| ------ | ------ | ------------------- | ---------- |
| 1      | 401    | User not logged in  | 用户未登录 |
| 40     | 404    | Group not found     | 群聊未找到 |
| 41     | 403    | User not authorized | 用户无权限 |
| 43     | 403    | Not in group        | 不在群聊中 |
| 48     | 409    | Already owner       | 已是群主   |

### 移除群成员

- **URL**: /user/remove_member

- **接口说明**: 用于群主或管理员移除群成员。

- **请求方法**: POST

- **请求体**: 

```json
{
  "group_id": "群组ID",
  "member_id": "成员ID"
}
```

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                | 说明           |
| ------ | ------ | ------------------- | -------------- |
| 1      | 401    | User not logged in  | 用户未登录     |
| 40     | 404    | Group not found     | 群聊未找到     |
| 41     | 403    | User not authorized | 用户无权限     |
| 43     | 403    | Not in group        | 不在群聊中     |
| 44     | 403    | Cannot remove self  | 不能移除自己   |
| 45     | 403    | Cannot remove owner | 不能移除群主   |
| 46     | 403    | Cannot remove admin | 不能移除管理员 |

### 邀请用户加入群聊

- **URL**: /user/invite_member

- **接口说明**: 用于邀请用户加入群聊。

- **请求方法**: POST

- **请求体**: 

```json
{
  "group_id": "群组ID",
  "invitee_id": "被邀请用户ID"
}
```

- **成功响应**

```json
// 群主或管理员
{
  "message": "User added directly by admin/owner"
}
// 不是群主或管理员
{
  "request_id": "请求ID"
}
```

- **错误响应**:
- 
| 错误码 | 状态码 | Info                    | 说明       |
| ------ | ------ | ----------------------- | ---------- |
| 1      | 401    | User not logged in      | 用户未登录 |
| 40     | 404    | Group not found         | 群聊未找到 |
| 41     | 403    | User not authorized     | 用户无权限 |
| 50     | 409    | Invitation already sent | 邀请已发送 |

### 查看邀请请求

- **URL**: /user/view_invitations

- **接口说明**: 用于管理员或群主查看所有待审核的邀请请求。

- **请求方法**: GET

- **请求体**: 

```json
{
  "group_id": "群组ID"
}
```

- **成功响应**

```json
{
  "join_requests": [
    {
      "request_id": "邀请ID",
      "invitee_id": "被邀请者ID",
      "invitee_name": "被邀请者用户名",
      "inviter_id": "邀请者ID",
      "inviter_name": "邀请者用户名",
      "status": "邀请状态，pending/accepted/rejected",
      "created_at": "邀请创建时间"
    }
    // ...
  ]
}
```

**邀请状态说明**:

- pending: 待处理
- accepted: 已接受
- rejected: 已拒绝

- **错误响应**:

| 错误码 | 状态码 | Info                | 说明       |
| ------ | ------ | ------------------- | ---------- |
| 1      | 401    | User not logged in  | 用户未登录 |
| 40     | 404    | Group not found     | 群聊未找到 |
| 41     | 403    | User not authorized | 用户无权限 |

### 处理进群邀请

- **URL**: /user/review_invitation

- **接口说明**: 用于管理员或群主回应进群邀请。

- **请求方法**: POST

- **请求体**: 

```json
{
  "request_id": "邀请ID",
  "response": "回应，accept/reject"
}
```

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                 | 说明       |
| ------ | ------ | -------------------- | ---------- |
| 1      | 401    | User not logged in   | 用户未登录 |
| 41     | 403    | User not authorized  | 用户无权限 |
| 51     | 404    | Invitation not found | 邀请未找到 |

### 用户退出群聊

- **URL**: /user/quit_group

- **接口说明**: 用于用户退出群聊。

- **请求方法**: POST

- **请求体**: 

```json
{
  "group_id": "群组ID"
}
```

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                | 说明       |
| ------ | ------ | ------------------- | ---------- |
| 1      | 401    | User not logged in  | 用户未登录 |
| 40     | 404    | Group not found     | 群聊未找到 |
| 41     | 403    | User not authorized | 用户无权限 |
| 47     | 403    | Owner cannot quit   | 群主不能退出群聊 |

> [!NOTE]
>
> **群主不可以退出群聊，只可以先转让，再退群**

### 群主解散群聊

- **URL**: /user/delete_group

- **接口说明**: 群主解散群聊。

- **请求方法**: POST

- **请求体**: 

```json
{
  "group_id": "群组ID"
}
```

- **成功响应**

```json
//
```

- **错误响应**:

| 错误码 | 状态码 | Info                | 说明       |
| ------ | ------ | ------------------- | ---------- |
| 1      | 401    | User not logged in  | 用户未登录 |
| 40     | 404    | Group not found     | 群聊未找到 |
| 41     | 403    | User not authorized | 用户无权限 |

