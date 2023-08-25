
<p  align="center">
  <a href="url"><img src="https://github.com/prince-ao/masterpiece/blob/main/assets/images/icons/android/Roundlogo.png" height="auto" width="200" style="border-radius:50px"></a>
</p>
<h1 align="center"> Masterpiece </h1>
<h3 align="center">Generate <i>Art</i> prices with AI.</h3>
<h1 id="top"></h1>

---
- [Overview](#overview)
- [Motivation](#motivation)
- [Disclaimer](#disclaimer)
- [Features](#features)
- [User-Flow](#user-flow)
- [Software-Architecture](#software-architecture)
- [Database Design](#database-design)
  - [Comment Table](#comment-table)
  - [Follow Table](#follow-table)
  - [Like Table](#like-table)
  - [Notification Table](#notification-table)
  - [Painting Table](#painting-table)
  - [User Table](#user-table)
  - [Database Relationship](#database-relationship)
- [Social API Design](#social-api-design)
  - [User Authentication and Authorization](#user-authentication-and-authorization)
  - [Paintings Action](#paintings-action)
  - [Comment Action](#comment-action)
  - [Like Action](#like-action)
  - [Follow Action](#follow-action)
  - [Notification Action](#notification-action)
  - [User Actions](#user-actions)
  - [Search Actions](#search-actions)
  - [Homepage Actions](#homepage-actions)
- [AI API Design](#ai-api-design)
  - [Patina Model](#patina-model)

---

## Overview <a name="overview"></a>

*Masterpiece* is an mobile app for art enthusiasts to explore and discover various artworks while also providing information about their prices. The app aims to bring together artists, galleries, and users in a seamless and visually appealing manner.*Masterpiece* is a powerful, user-friendly mobile app that generates AI prices for your Images. By uploading a image, this app generates prices for your Images, leveraging the capabilities of Neural Networks(Patina-Net).

## Motivation <a name="motivation"></a>

Our motivation behind developing this software app was to create a fair art market that addresses the challenges faced by both sellers and buyers in determining the value and pricing of art pieces. We recognized that the traditional art market can be opaque and subjective, making it difficult for artists and art enthusiasts to navigate and establish fair transactions.With the power of AI, we aim to revolutionize the art market by leveraging advanced algorithms and data-driven insights. Our goal is to provide a platform that fosters transparency, trust, and fairness for all stakeholders involved in the art ecosystem.
## Disclaimer <a name="disclaimer"></a>

*Masterpiece* is currently under development and may not have all the intended features or functionalities at this stage. We are continuously working to enhance and improve the app, and future updates may introduce additional capabilities.

---
## Features <a name="features"></a>

<h1 align="center">👇<br></h1>
<table align="center" width="200px" >
    <tr>
        <td>
            <h3>◦ User Authentication</h3>
            <ul>
                <li>Users can create accounts, log in, and manage their profiles.</li>
                <li>The app will include a user authentication system to ensure secure access and personalized experiences. </li>
            </ul>
        </td>
    </tr>
   <tr>
        <td>
            <h3>◦ Artwork Catalog</h3>
            <ul>
                <li>The app will have a comprehensive catalog of artworks, organized by categories such as genre, artist, medium, and price range.</li>
                <li>Users can browse through the catalog and view detailed information about each artwork. </li>
            </ul>
        </td>
    </tr>
   <tr>
        <td>
            <h3>◦ Artwork Details</h3>
            <ul>
                <li>Each artwork will have its dedicated page displaying high-quality images, artist information, description, and pricing details.</li>
                <li>Users can also access additional information such as the artist's biography and other related artworks.</li>
            </ul>
        </td>
    </tr>
  <tr>
        <td>
            <h3>◦ Search and Filters</h3>
            <ul>
                <li>The app will provide search functionality, allowing users to find specific artworks or filter them based on various criteria. Filters may include artist name, art style, medium, and price range.</li>
            </ul>
        </td>
    </tr>
   <tr>
        <td>
            <h3>◦ Favorites and Collections</h3>
            <ul>
                <li>Users will have the ability to save their favorite artworks and create personalized collections.</li>
                <li>This feature enables users to curate their own virtual art galleries and easily access their preferred pieces.</li>
            </ul>
        </td>
    </tr>
   <tr>
        <td>
            <h3>◦ Pricing and Availability</h3>
            <ul>
                <li>The app will provide up-to-date information on the pricing and availability of artworks</li>
                <li>Users can view the current price, any discounts or offers, and contact the respective galleries or artists for purchasing inquiries.</li>
            </ul>
        </td>
    </tr>
</table>


## User-Flow <a name="user-flow"></a>

![Untitled.png](https://github.com/prince-ao/masterpiece/blob/main/assets/images/User-flow.png)

## Software-Architecture <a name="software-architecture"></a>

![Untitled.png](https://cdn.discordapp.com/attachments/1140776548505485401/1144641792621433013/arc.png)

## Database Design <a name="database-design"></a>
### Comment Table <a name="comment-table"></a>
```
CREATE TABLE IF NOT EXISTS m_comment (
	comment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT REFERENCES m_user,
	painting_id INT REFERENCES painting,
	text TEXT,
	created_at TIMESTAMP NOT NULL
);
```
### Follow Table <a name="follow-table"></a>
```
CREATE TABLE IF NOT EXISTS follow (
	follow_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	follower_id INT REFERENCES m_user,
	following_id INT REFERENCES m_user,
	created_at TIMESTAMP NOT NULL
);
```
### Like Table <a name="like-table"></a>
```
CREATE TABLE IF NOT EXISTS m_like (
	m_like_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT REFERENCES m_user,
	painting_id INT REFERENCES painting,
	created_at TIMESTAMP NOT NULL
);
```
### Notification Table <a name="notification-table"></a>
```
CREATE TABLE IF NOT EXISTS notification (
	notification_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT REFERENCES m_user NOT NULL,
	action_user_id INT REFERENCES m_user NOT NULL,
	action_type VARCHAR(200) NOT NULL,
	painting_id INT REFERENCES painting,
	is_read BOOLEAN NOT NULL,
	created_at TIMESTAMP NOT NULL
);
```
### Painting Table <a name="painting-table"></a>
```
CREATE TABLE IF NOT EXISTS painting (
	painting_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT REFERENCES m_user,
	name VARCHAR(200) NOT NULL,
	caption VARCHAR(23) NOT NULL,
	image_url TEXT NOT NULL,
	price INT NOT NULL,
	ai_price INT NOT NULL,
	sold BOOLEAN NOT NULL,
	created_at TIMESTAMP NOT NULL
);
```
### User Table <a name="user-table"></a>
```
CREATE TABLE IF NOT EXISTS m_user (
	user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username varchar(25) NOT NULL,
	email TEXT NOT NULL,
	bio TEXT,
	profile_image_url TEXT;
	password VARCHAR(100) NOT NULL,
	created_at TIMESTAMP NOT NULL
);
```
### Database Relationship <a name="database-relationship"></a>
<img src="https://raw.githubusercontent.com/prince-ao/masterpiece/warhol/assets/images/db-schema.png">

## Social API Design <a name="social-api-design"></a>

### User Authentication and Authorization <a name="user-authentication-and-authorization"></a>

##### POST /api/auth/signup

```json
{
  "body": {
    "username": "string",
    "email": "string",
    "password": "string"
  }
}
```

`200` response:

```json
{
  "response": {
    "token": "string"
  }
}
```

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

##### POST /api/auth/login

_Note: username xor email_

```json
{
  "body": {
    "username": "string",
    "email": "string",
    "password": "string"
  }
}
```

`200` response:

```json
{
  "response": {
    "token": "string"
  }
}
```

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

---

### Paintings Action <a name="paintings-action"></a>

##### GET /api/paintings

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

```json
{
  "response": [
    {
      "image_url": "string"
    }
  ]
}
```

##### GET /api/paintings/user/[user_id]

`200` response:

```json
{
  "response": [
    {
      "image_url": "string"
    }
  ]
}
```

##### GET /api/paintings/[painting_id]

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

```json
{
  "response": {
    "image_url": "string",
    "name": "string",
    "price": "number",
    "ai_price": "number",
    "caption": "string"
  }
}
```

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

##### POST /api/paintings

_Note: the image is base64 encoded_

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  },
  "body": {
    "caption": "string",
    "name": "string",
    "image": "string",
    "price": "number"
  }
}
```

`200` response:

```json
{
  "response": {
    "image_url": "string"
  }
}
```

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

##### PATCH /api/paintings/[painting_id]

_Note: the body is caption or name_

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  },
  "body": {
    "caption": "string",
    "name": "string"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

##### DELETE /api/paintings/[painting_id]

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

---

### Comment Action <a name="comment-action"></a>

##### POST /api/paintings/[painting_id]/comments

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  },
  "body": {
    "text": "string"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

##### PATCH /api/paintings/[painting_id]/comments/[comment_id]

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  },
  "body": {
    "text": "string"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

##### DELETE /api/paintings/[painting_id]/comments/[comment_id]

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

---

### Like Action <a name="like-action"></a>

##### POST /api/paintings/[painting_id]/like

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

##### DELETE /api/paintings/[painting_id]/like/[like_id]

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

---

### Follow Action <a name="follow-action"></a>

##### GET /api/follow/[user_id]

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

##### POST /api/follow/[user_id]

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

---

##### DELETE /api/follow/[user_id]

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

---

### Notification Action <a name="notification-action"></a>

##### GET /api/notifications

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

##### DELETE /api/notifications/[notifications_id]

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

### User Actions <a name="user-actions"></a>

##### GET /api/user/[user_id]

`200` response:

```json
{
  "username": "string",
  "bio": "string",
  "followers_count": "number",
  "following_count": "number",
  "posts_count": "number",
  "profile_image": "string"
}
```

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

##### GET /api/profile

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

```json
{
  "username": "string",
  "bio": "string",
  "followers_count": "number",
  "following_count": "number",
  "painting_count": "number",
  "profile_image": "string"
}
```

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

---

### Search Actions <a name="search-actions"></a>

##### GET /api/search?s=[search_string]

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

```json
[
  {
    "username": "string",
    "user_id": "number"
  }
]
```

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

---

---

### Homepage Actions <a name="homepage-actions"></a>

##### GET /api/homepage?page=[page_number]

_Note auth is optional_

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

`200` response:

```json
{
  "data": [
    {
      "image_url": "string",
      "name": "string",
      "user_id": "string",
      "username": "string",
      "profile_image_url": "string",
      "caption": "string",
      "price": "number",
      "ai_price": "number",
      "likes": "number"
    }
  ],
  "hasNext": "boolean"
}
```

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

## AI API Design <a name="ai-api-design"></a>

### Patina Model <a name="patina-model"></a>

##### POST /patina

_Note: the image is base64 encoded_

```json
{
  "body": {
    "image": "string"
  }
}
```

`200` response:

```json
{
  "price": "number"
}
```

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```

##### PUT /patina

```json
{
  "Content-Type": "multipart/form-data",
  "body": {
    "image": "[image data]",
    "price": "number"
  }
}
```

`200` response:

`400` response:

```json
{
  "response": {
    "error_message": "string"
  }
}
```
<p align="right">
  <a href="#top"><b>🔝 Return </b></a>
</p>
