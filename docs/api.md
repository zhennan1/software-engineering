# API 文档

## 说明

- **信息认证**：

  ​	在项目中，验证用户身份的方式是需要携带 JWT 令牌。在接下来的API介绍中，每个有“**需要登录**”标志的API都需要将请求头 `Authorization` 字段设置为 JWT 令牌。

- **成功响应格式**：

```json
{
  "code": 0,
  "info": "Succeed",
  "data":{/* 其他字段 */}
}
```

​	后续的成功响应只提供`data`。

- **错误响应格式**：

```json
{
    "code": “*”,
    "info": "[Some message]"
}
```

​	后续的错误响应提供对应的`code`，`info`和对应的说明。

- **异常状态码**

  成功响应的状态码为200，其余通用的异常返回值：

| HTTP状态码 | 说明                 |
| ---------- | -------------------- |
| 400        | 通用错误             |
| 401        | 鉴权失败：用户未登陆 |
| 405        | 请求方法不允许       |
| 500        | 服务端其他内部错误   |

## 用户管理

### 用户注册

-  **URL**: /user/register

- **接口说明**：用于新用户创建账户。

- **请求方式**: POST

- **请求体**：

  ```json
  {
    "username": "Alice", 
    "password": "123456", 
    "email": "example@example.com", 
    "phone": "1234567890" 
  }
  ```

  上述字段的说明为：

  - `userName`。表示用户名，应当为非空字符串，且长度不大于 20,不能与其他用户重复。
  - `password`。表示用户的密码，应当为非空字符串，且长度不大于 20。
  - `email`：表示用户的电子邮件地址，应当为非空字符串，且符合标准的电子邮件地址格式，长度不应超过 255 个字符。
  - `phone`：表示用户的手机号码，应当为非空字符串，且只包含数字字符，长度不应超过 20 个字符。

- **成功响应**

  ```json
  {
    "created": true,
    "id":1//用户id
  }
  ```

- **错误响应**

  | code | info                    | 说明           |
  | :--- | :---------------------- | -------------- |
  | 1    | Username already exists | 用户名已经存在 |
  | 2    | Invalid username        | 用户名不合法   |
  | 3    | Invalid password        | 密码不合法     |

### 用户注销

> [!NOTE]
>
> 需要登录

-  **URL**: /user/logoff

- **接口说明**：用于用户注销账户。

- **请求方式**: POST

- **成功响应**

  ```json
  {
    "deleted": true
  }
  ```

- **错误响应**

  | code | info                  | 说明       |
  | :--- | :-------------------- | ---------- |
  | 1    | User is not logged in | 用户未登录 |

### 用户登录

-  **URL**: /user/login

- **接口说明**：用于用户登录账户。

- **请求方式**: POST

- **请求体**：

  ```json
  {
    "username": "Alice", 
    "password": "123456", 
  }
  ```

- **成功响应**

  ```json
  {
    "logged in": true,
    "token": "***.***.***"  //JWT
  }
  ```

- **错误响应**

  | code | info                | 说明       |
  | :--- | :------------------ | ---------- |
  | 1    | User does not exist | 用户不存在 |
  | 2    | Incorrect password  | 密码错误   |

### 用户登出

> [!NOTE]
>
> 需要登录

-  **URL**: /user/logout

- **接口说明**：用于用户登出账户。

- **请求方式**: POST

- **成功响应**

  ```json
  {
    "logged out": true
  }
  ```

- **错误响应**

  | code | info                  | 说明       |
  | :--- | :-------------------- | ---------- |
  | 1    | User is not logged in | 用户未登录 |

## 编辑信息

> [!NOTE]
>
> 需要登录

### 普通信息修改

- **URL**: /user/update_normal_info

- **接口说明**：用于用户修改个人用户普通信息。

- **请求方法**: PUT

- **请求体**：

  ```json
  {
    "username": "Alice", 
    "avatar_url": "http://example.com/media/avatar/new_avatar.jpg"
  }
  ```

  - `avatar_url`表示用户头像的链接。

- **成功响应**

  ```json
  {
    "update": true,
  }
  ```

- **错误响应**:

  | code | info                    | 说明           |
  | :--- | :---------------------- | -------------- |
  | 1    | User is not logged in   | 用户未登录     |
  | 2    | Username already exists | 用户名已经存在 |
  | 3    | Invalid username        | 新用户名不合法 |

### 身份认证信息修改

- **URL**: /user/update_auth_info

- **接口说明**：用于用户修改用户身份认证信息。

- **请求方法**: PUT

- **请求体**：

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
  {
    "update": true,
  }
  ```

- **错误响应**:

  | code | info                  | 说明         |
  | :--- | :-------------------- | ------------ |
  | 1    | User is not logged in | 用户未登录   |
  | 2    | Wrong old password    | 旧密码错误   |
  | 3    | Invalid password      | 新密码不合法 |

## 好友管理

> [!NOTE]
>
> 需要登录

### 用户查找

- **URL**: /user/friend/search

- **接口说明**：用于用户查找其他⽤⼾。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "query": "search_query"
  }
  ```

- **成功响应**

  ```json
  {
    "results": [
      {
        "user_id": 1,
        "username": "example_user",
        "avatar_url": "http://example.com/avatar.jpg"
      },
      {
        "user_id": 2,
        "username": "another_user",
        "avatar_url": "http://example.com/avatar2.jpg"
      },
      ...
    ]
  }
  ```

- **错误响应**:

  | code | info                  | 说明       |
  | :--- | :-------------------- | ---------- |
  | 1    | User is not logged in | 用户未登录 |

### 用户详情

- **URL**: /user/profile/{user_id}

- **接口说明**：用于获取特定用户的详细信息。

- **请求方法**: GET

- **成功响应**

  ```json
  {
    "user_id": 1,
    "username": "example_user",
    "email": "example@example.com",
    "phone": "1234567890",
    "avatar_url": "http://example.com/avatar.jpg",
    "bio": "This is a short bio of the user."
  }
  ```

  - `bio` 是用户的个人简介。

- **错误响应**:

  | code | info                  | 说明           |
  | :--- | --------------------- | -------------- |
  | 1    | User is not logged in | 用户未登录     |
  | 2    | User not found        | 未找到指定用户 |

### 发送好友申请

- **URL**: /user/friend/request

- **接口说明**：用于用户发送添加好友申请。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "recipient_id": 12345
  }
  ```

  - `recipient_id`是接收者的用户ID，即申请添加为好友的目标用户的ID

- **成功响应**

  ```json
  {
    "sent": true
  }
  ```

- **错误响应**:

  | code | info                       | 说明                 |
  | :--- | :------------------------- | -------------------- |
  | 1    | User is not logged in      | 用户未登录           |
  | 2    | Target does not exist      | 目标不存在           |
  | 3    | Already friends            | 已经是好友           |
  | 4    | The request already exists | 请求已存在           |
  | 5    | Self request detected      | 不能发送给自己的请求 |

### 查看好友申请

- **URL**: /user/friend/requests

- **接口说明**：用于用户查看收到的好友申请。

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
        "sent_time": "2024-03-21 12:00:00"
      },
      ...
    ]
  }
  ```

  - `request_id`：申请ID。
  - `sender_id`：发送者的用户ID。
  - `sender_name`：发送者的用户名。
  - `sender_avatar`：发送者的头像链接。
  - `sent_time`：申请发送时间。

- **错误响应**:

  | code | info                  | 说明       |
  | :--- | :-------------------- | ---------- |
  | 1    | User is not logged in | 用户未登录 |

### 回应好友申请

- **URL**: /user/respond_friend_request

- **接口说明**：用于用户回应好友申请。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "request_id": "申请ID",
    "response": "accept" //或 "reject"
  }
  ```

- **成功响应**

  ```json
  {
    "responded": true
  }
  ```

- **错误响应**:

  | code | info                             | 说明             |
  | :--- | :------------------------------- | ---------------- |
  | 1    | User is not logged in            | 用户未登录       |
  | 2    | The target user no longer exists | 目标用户已不存在 |

### 删除好友

- **URL**: /user/delete_friend

- **接口说明**：用于用户删除好友。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "user_id":"好友ID"
  }
  ```

- **成功响应**

  ```json
  {
    "delete": true
  }
  ```

- **错误响应**:

  | code | info                  | 说明         |
  | :--- | :-------------------- | ------------ |
  | 1    | User is not logged in | 用户未登录   |
  | 2    | Target does not exist | 目标不存在   |
  | 3    | Not friends           | 对方不是好友 |

### 获取好友列表

- **URL**: /user/get_friends

- **接口说明**：用于用户获取所有好友。

- **请求方法**: GET

- **成功响应**

  ```json
  {
    "friends": [
          {
              "friend_id": "好友ID",
        			"username": "好友用户名",
        			"avatar_url": "好友头像URL"
          },
      ...
      ]
  }
  ```

- **错误响应**:

  | code | info                  | 说明       |
  | :--- | :-------------------- | ---------- |
  | 1    | User is not logged in | 用户未登录 |

### 创建分组

- **URL**: /user/create_friend_group

- **接口说明**：用于用户创建好友分组。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "friend_group_name":"classmate"
  }
  ```

  - `friend_group_name`代表分组名，非空字符串，长度不大于20个字符,不能重复。

- **成功响应**

  ```json
  {
    "friend_group_id": "分组的ID"
  }
  ```

- **错误响应**:

  | code | info                             | 说明         |
  | :--- | :------------------------------- | ------------ |
  | 1    | User is not logged in            | 用户未登录   |
  | 2    | The friend group name is invalid | 分组名不合法 |

### 删除分组

- **URL**: /user/delete_friend_group

- **接口说明**：用于用户删除好友分组。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "friend_group_id":"分组的ID"
  }
  ```

- **成功响应**

  ```json
  {
    "deleted": true
  }
  ```

- **错误响应**:

  | code | info                            | 说明       |
  | :--- | :------------------------------ | ---------- |
  | 1    | User is not logged in           | 用户未登录 |
  | 2    | The friend group does not exist | 分组不存在 |

### 查看分组

- **URL**: /user/get_friend_groups

- **接口说明**：用于用户获取所有好友分组。

- **请求方法**: GET

- **成功响应**

  ```json
  {
    "friend_groups": [
      {
        "friend_group_id": "分组ID",
        "friend_group_name": "分组名称"
      },
      ...
    ]
  }
  ```

- **错误响应**:

  | code | info                  | 说明       |
  | :--- | :-------------------- | ---------- |
  | 1    | User is not logged in | 用户未登录 |

### 查看分组好友

- **URL**: /user/friend_groups/{friend_group_id}

- **接口说明**：用于用户获取所有好友分组。

- **请求方法**: GET

- **请求体**：

  ```json
  {
    "friend_group_id":"分组ID"
  }
  ```

- **成功响应**

  ```json
  {
    "friends": [
      {
        "user_id": "用户ID",
        "username": "好友的用户名",
        "avatar_url": "好友的头像链接"
      },
      ...
    ]
  }
  ```
  
- **错误响应**:

  | code | info                            | 说明       |
  | :--- | :------------------------------ | ---------- |
  | 1    | User is not logged in           | 用户未登录 |
  | 2    | The friend group does not exist | 分组不存在 |

### 添加好友到分组

- **URL**: /user/add_friend_to_friend_group

- **接口说明**：用于用户将好友添加到某一指定的分组。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "user_id": "对方的用户ID",
    "friend_group_id": "分组的ID"
  }
  ```

- **成功响应**

  ```json
  {
    "added": true
  }
  ```

- **错误响应**:

  | code | info                            | 说明               |
  | :--- | :------------------------------ | ------------------ |
  | 1    | User is not logged in           | 用户未登录         |
  | 2    | The friend group does not exist | 分组不存在         |
  | 3    | Not friends                     | 对方不是好友       |
  | 4    | Already in this friend group    | 对方已经在该分组内 |

### 将好友移除分组

- **URL**: /user/delete_friend_from_friend_group

- **接口说明**：用于用户将好友从分组移出。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "user_id": "对方的id",
    "friend_group_id": "分组id"
  }
  ```

- **成功响应**

  ```json
  {
    "deleted": true
  }
  ```

- **错误响应**:

  | code | info                                 | 说明             |
  | :--- | :----------------------------------- | ---------------- |
  | 1    | User is not logged in                | 用户未登录       |
  | 2    | The  friend group does not exist     | 分组不存在       |
  | 3    | Not friends                          | 对方不是好友     |
  | 4    | The user is not in the  friend group | 对方不在该分组内 |

## 会话管理

> [!NOTE]
>
> 需要登录

### 获取所有私聊

- **URL**: /user/get_private_conversations

- **接口说明**：用于用户获取所有的私人聊天。

- **请求方法**:GET

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
      ...
    ]
  }
  ```

- **错误响应**:

  | code | info                  | 说明       |
  | :--- | :-------------------- | ---------- |
  | 1    | User is not logged in | 用户未登录 |

### 发起私聊

- **URL**: /user/create_private_conversation

- **接口说明**：用于用户获取和某朋友的私聊。

- **请求方法**:POST

- **请求体**：

  ```json
  {
    "friend_id":"好友的id"
  }
  ```

- **成功响应**

  ```json
  {
    "conversation_id": "会话id",
    "friend_name": "好友用户名",
    "friend_avatar": "好友头像"
  }
  ```
  
- **错误响应**:

  | code | info                  | 说明         |
  | :--- | :-------------------- | ------------ |
  | 1    | User is not logged in | 用户未登录   |
  | 2    | Target does not exist | 目标不存在   |
  | 3    | Not friends           | 对方不是好友 |

### 聊天界面

- **URL**: /user/conversation/{conversation_id}

- **接口说明**：用于用户获取和某个朋友或群聊的聊天界面。

- **请求方法**:GET

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
        "reply_id": "回复消息ID",
        "reply_content": "回复内容",
  			"replied_times": "被回复次数",
        "read_status": "是否已读",
        "read_by": ["已读用户ID"]
      },
      ...
    ]
  }
  ```

  - `reply_id`是所回复消息的id。
  - `read_by`是列表，阅读此条消息群成员的id。

- **错误响应**:

  | code | info                   | 说明           |
  | :--- | :--------------------- | -------------- |
  | 1    | User is not logged in  | 用户未登录     |
  | 2    | Target does not exist  | 目标会话不存在 |
  | 3    | User is not in session | 用户不在会话中 |

### 发送消息

- **URL**: /user/send_mesage

- **接口说明**：用于用户在某个会话发送消息。

- **请求方法**:POST

- **请求体**：

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

  | code | info                   | 说明           |
  | :--- | :--------------------- | -------------- |
  | 1    | User is not logged in  | 用户未登录     |
  | 2    | Target does not exist  | 目标会话不存在 |
  | 3    | User is not in session | 用户不在会话中 |

### 获取所有聊天记录

- **URL**: /user/records/{conversation_id}

- **接口说明**：用于用户获取某一会话的所有聊天记录。

- **请求方法**:GET

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
        "reply_id": "回复消息ID",
        "reply_content": "回复内容"
      },
      ...
    ]
  }
  ```

- **错误响应**:

  | code | info                   | 说明           |
  | :--- | :--------------------- | -------------- |
  | 1    | User is not logged in  | 用户未登录     |
  | 2    | Target does not exist  | 目标会话不存在 |
  | 3    | User is not in session | 用户不在会话中 |

### 根据时间或成员查询聊天记录

- **URL**: /user/filter_records

- **接口说明**：用于用户根据时间或成员获取某一会话的所有聊天记录。

- **请求方法**：POST

- **请求体**：

  ```json
  {
    "conversation_id": 会话id,
    "content": 消息内容,
    "start_time": 开始时间,
    "end_time": 结束时间,
    "sender_id": 发送成员的id
  }
  ```

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
        "reply_id": "回复消息ID",
        "reply_content": "回复内容"
      },
      ...
    ]
  }
  ```

- **错误响应**:

  | code | info                   | 说明           |
  | :--- | :--------------------- | -------------- |
  | 1    | User is not logged in  | 用户未登录     |
  | 2    | Target does not exist  | 目标会话不存在 |
  | 3    | User is not in session | 用户不在会话中 |

### 删除聊天记录

- **URL**: /user/delete_records

- **接口说明**：用于用户删除某一会话的聊天记录。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "conversation_id": "会话id"
  }
  ```

- **成功响应**

  ```json
  {
    "delete": true
  }
  ```

- **错误响应**:

  | code | info                   | 说明           |
  | :--- | :--------------------- | -------------- |
  | 1    | User is not logged in  | 用户未登录     |
  | 2    | Target does not exist  | 目标会话不存在 |
  | 3    | User is not in session | 用户不在会话   |

## 群聊管理

> [!NOTE]
>
> 需要登录

### 发起群聊

- **URL**: /user/create_group_conversation

- **接口说明**：用于用户发起群聊。

- **请求方法**:POST

- **请求体**：

  ```json
  {
    "members_id": ["用户ID1", "用户ID2", ...],
    "name": "群聊名称"
  }
  ```

  - `members`是列表类型，包含（除用户自身以外）群聊成员的id列表。

- **成功响应**

  ```json
  {
   	"conversation_id": "会话ID",
    "group_id": "群ID",
    "group_name": "群聊名称",
    "group_avatar": "群聊头像链接"
  }
  ```

- **错误响应**:

  | code | info                  | 说明           |
  | :--- | :-------------------- | -------------- |
  | 1    | User is not logged in | 用户未登录     |
  | 2    | Target does not exist | 有目标不存在   |
  | 3    | Not friends           | 有目标不是好友 |

### 获取所有群聊

- **URL**: /user/get_group_conversation

- **接口说明**：用于用户获取所有的群聊。

- **请求方法**:GET

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
      ...
    ]
  }
  ```

- **错误响应**:

  | code | info                  | 说明       |
  | :--- | :-------------------- | ---------- |
  | 1    | User is not logged in | 用户未登录 |

### 群聊信息展示

- **URL**: /user/conversation/{group_id}/info

- **接口说明**：用于获取特定群聊的基本信息。

- **请求方法**: GET

- **成功响应**

  ```json
  {
    "group_id": "群组ID",
    "group_name": "群聊名称",
    "owner": {
      "user_id": "群主ID",
      "username": "群主用户名",
      "avatar": "群主头像链接"
    },
    "administrators": [
      {
        "user_id": "管理员ID",
        "username": "管理员用户名",
        "avatar": "管理员头像链接"
      },
      ...,
    ],
    "members": [
      {
        "user_id": "成员ID",
        "username": "成员用户名",
        "avatar": "成员头像链接"
      },
      ...,
    ],
    "announcement": "历史群公告"
  }
  ```

**错误响应**:

| code | info                   | 说明           |
| :--- | :--------------------- | -------------- |
| 1    | User is not logged in  | 用户未登录     |
| 2    | Target does not exist  | 群聊不存在     |
| 3    | User is not in session | 用户不在会话中 |

### 添加管理员

- **URL**: /user/group/add_admin

- **接口说明**：用于群主将群成员提升为管理员。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "group_id": "群组ID",
    "member_id": "成员ID"
  }
  ```

- **成功响应**

  ```json
  {
    "added": true
  }
  ```

- **错误响应**:

  | code | info                    | 说明             |
  | :--- | :---------------------- | ---------------- |
  | 1    | User is not logged in   | 用户未登录       |
  | 2    | Group does not exist    | 群组不存在       |
  | 3    | Member does not exist   | 成员不存在       |
  | 4    | Member is already admin | 成员已经是管理员 |
  | 5    | Permission denied       | 操作权限不足     |

### 移除管理员

- **URL**: /user/group/remove_admin

- **接口说明**：用于群主将管理员移除出管理员角色。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "group_id": "群组ID",
    "admin_id": "管理员ID"
  }
  ```

- **成功响应**

  ```json
  {
    "removed": true
  }
  ```

- **错误响应**:

  | code | info                  | 说明           |
  | :--- | :-------------------- | -------------- |
  | 1    | User is not logged in | 用户未登录     |
  | 2    | Group does not exist  | 群组不存在     |
  | 3    | Admin does not exist  | 管理员不存在   |
  | 4    | Member is not admin   | 目标不是管理员 |
  | 5    | Permission denied     | 操作权限不足   |

### 转让群主

- **URL**: /user/group/transfer_ownership

- **接口说明**：用于群主将群的所有权转让给另一个群成员。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "group_id": "群组ID",
    "new_owner_id": "新群主ID"
  }
  ```

- **成功响应**

  ```
  
  {
    "transferred": true
  }
  ```

- **错误响应**:

  | code | info                  | 说明         |
  | :--- | :-------------------- | ------------ |
  | 1    | User is not logged in | 用户未登录   |
  | 2    | Group does not exist  | 群组不存在   |
  | 3    | Member does not exist | 目标不存在   |
  | 4    | Permission denied     | 操作权限不足 |

### 移除群成员

- **URL**: /user/group/remove_member

- **接口说明**：用于群主或管理员移除群成员。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "group_id": "群组ID",
    "member_id": "成员ID"
  }
  ```

- **成功响应**

  ```json
  {
    "removed": true
  }
  ```

- **错误响应**:

  | code | info                       | 说明           |
  | :--- | :------------------------- | -------------- |
  | 1    | User is not logged in      | 用户未登录     |
  | 2    | Group does not exist       | 群组不存在     |
  | 4    | Member is not in the group | 成员不在群组中 |
  | 5    | Permission denied          | 操作权限不足   |

### 邀请用户加入群聊

- **URL**: /user/group/invite_member

- **接口说明**：用于管理员或群主邀请用户加入群聊。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "group_id": "群组ID",
    "invited_user_id": "被邀请用户ID"
  }
  ```

- **成功响应**

  ```json
  {
    "invited": true
  }
  ```

- **错误响应**:

  | code | info                         | 说明             |
  | :--- | :--------------------------- | ---------------- |
  | 1    | User is not logged in        | 用户未登录       |
  | 2    | Group does not exist         | 群组不存在       |
  | 3    | User does not exist          | 用户不存在       |
  | 4    | User is already in the group | 用户已经在群组中 |
  | 5    | Permission denied            | 操作权限不足     |

### 邀请加入群聊

- **URL**: /user/group/invite

- **接口说明**：用于群成员邀请用户加入群聊，需要群主或管理员审核。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "group_id": "群组ID",
    "invited_user_id": "被邀请用户ID"
  }
  ```

- **成功响应**

  ```json
  {
    "invited": true
  }
  ```

- **错误响应**:

  | code | info                    | 说明         |
  | :--- | :---------------------- | ------------ |
  | 1    | User is not logged in   | 用户未登录   |
  | 2    | Group does not exist    | 群组不存在   |
  | 3    | User does not exist     | 用户不存在   |
  | 4    | Invitation already sent | 邀请已发送   |
  | 5    | Permission denied       | 操作权限不足 |

### 查看邀请请求

- **URL**: /user/group/invitations

- **接口说明**：用于管理员或群主查看所有待审核的邀请请求。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "group_id": "群组ID"
  }
  ```

- **成功响应**

  ```json
  {
    "invitations": [
      {
        "invitation_id": "邀请ID",
    		"inviter": {
      "user_id": "邀请者ID",
      "name": "邀请者用户名",
      "avatar": "邀请者头像链接"
    },
    "invitee": {
      "user_id": "被邀请者ID",
      "name": "被邀请者用户名",
      "avatar": "被邀请者头像链接"
    },
    "status": "邀请状态",
    "create_time": "创建时间"
      }
      ...
    ]
  }
  ```

  **邀请状态说明**:

  - pending: 待处理
  - accepted: 已接受
  - rejected: 已拒绝

- **错误响应**:

  | code | info                  | 说明         |
  | :--- | :-------------------- | ------------ |
  | 1    | User is not logged in | 用户未登录   |
  | 2    | Group does not exist  | 群组不存在   |
  | 3    | Permission denied     | 操作权限不足 |

### 回应进群邀请

- **URL**: /user/group/respond_invitation

- **接口说明**：用于管理员或群主回应进群邀请。

- **请求方法**: POST

- **请求体**：

  ```json
  {
  	"group_id": "群组ID"
    "invitation_id": "邀请ID",
    "response": "回应" (accepted/rejected)
  }
  ```

- **成功响应**

  ```json
  {
    "responded": true
  }
  ```

- **错误响应**:

  | code | info                  | 说明         |
  | :--- | :-------------------- | ------------ |
  | 1    | User is not logged in | 用户未登录   |
  | 2    | Invitation not found  | 邀请不存在   |
  | 3    | Group does not exist  | 群组不存在   |
  | 4    | Permission denied     | 操作权限不足 |

### 用户退出群聊

- **URL**: /user/group/leave_group

- **接口说明**：用于用户退出群聊。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "group_id": "群组ID"
  }
  ```

- **成功响应**

  ```json
  {
    "left": true
  }
  ```

- **错误响应**:

  | code | info                    | 说明           |
  | :--- | :---------------------- | -------------- |
  | 1    | User is not logged in   | 用户未登录     |
  | 2    | Group does not exist    | 群组不存在     |
  | 3    | User is not a member    | 用户不是群成员 |
  | 4    | User is the group owner | 用户是群主     |

  > [!NOTE]
  >
  > **群主不可以退出群聊，只可以先转让，再退群**

### 设置群公告

- **URL**:/user /group/set_announcement

- **接口说明**：用于群主或管理员设置群公告。

- **请求方法**: POST

- **请求体**：

  ```json
  {
    "group_id": "群组ID",
    "announcement": "群公告内容"
  }
  ```

- **成功响应**

  ```json
  {
    "set": true
  }
  ```

- **错误响应**:

  | code | info                  | 说明         |
  | :--- | :-------------------- | ------------ |
  | 1    | User is not logged in | 用户未登录   |
  | 2    | Group does not exist  | 群组不存在   |
  | 3    | Permission denied     | 操作权限不足 |
