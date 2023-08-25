
<p  align="center">
  <a href="url"><img src="https://github.com/prince-ao/masterpiece/blob/main/assets/images/icons/android/Roundlogo.png" height="auto" width="200" style="border-radius:50px"></a>
</p>
<h1 align="center"> Masterpiece </h1>
<h3 align="center">Generate <i>Art</i> prices with AI.</h3>
<h1 id="top"></h1>

📍 ***Overview***

*Masterpiece* is an mobile app for art enthusiasts to explore and discover various artworks while also providing information about their prices. The app aims to bring together artists, galleries, and users in a seamless and visually appealing manner.*Masterpiece* is a powerful, user-friendly mobile app that generates AI prices for your Images. By uploading a image, this app generates prices for your Images, leveraging the capabilities of Neural Networks(Patina-Net).

#### 🎯 *Motivation*

Our motivation behind developing this software app was to create a fair art market that addresses the challenges faced by both sellers and buyers in determining the value and pricing of art pieces. We recognized that the traditional art market can be opaque and subjective, making it difficult for artists and art enthusiasts to navigate and establish fair transactions.With the power of AI, we aim to revolutionize the art market by leveraging advanced algorithms and data-driven insights. Our goal is to provide a platform that fosters transparency, trust, and fairness for all stakeholders involved in the art ecosystem.
#### ⚠️ *Disclaimer*

*Masterpiece* is currently under development and may not have all the intended features or functionalities at this stage. We are continuously working to enhance and improve the app, and future updates may introduce additional capabilities.

---
## ⚙️ Features

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


# User-Flow

![Untitled.png](https://github.com/prince-ao/masterpiece/blob/main/assets/images/User-flow.png)

# Software-Architecture

![Untitled.png](https://cdn.discordapp.com/attachments/1140776548505485401/1144641792621433013/arc.png)

# Database Design
Comment.sql
```
CREATE TABLE IF NOT EXISTS m_comment (
	comment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT REFERENCES m_user,
	painting_id INT REFERENCES painting,
	text TEXT,
	created_at TIMESTAMP NOT NULL
);
```
Follow.sql
```
CREATE TABLE IF NOT EXISTS follow (
	follow_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	follower_id INT REFERENCES m_user,
	following_id INT REFERENCES m_user,
	created_at TIMESTAMP NOT NULL
);
```
Like.sql
```
CREATE TABLE IF NOT EXISTS m_like (
	m_like_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT REFERENCES m_user,
	painting_id INT REFERENCES painting,
	created_at TIMESTAMP NOT NULL
);
```
Notification.sql
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
Painting.sql
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
User.sql
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
## Database relationship
<img src="https://raw.githubusercontent.com/prince-ao/masterpiece/warhol/assets/images/db-schema.png">
<p align="right">
  <a href="#top"><b>🔝 Return </b></a>
</p>
