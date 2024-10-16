Design Full-Stack MusicApp

### **The tools, frameworks, libraries, and environments used in the project are displayed implement with**
![image](https://github.com/user-attachments/assets/89465805-dfb3-4335-b3d8-8cdaa65ad4cc)

![image](https://github.com/user-attachments/assets/33c38eb2-0af7-48df-8c47-ccdfb68926b6)


![image](https://github.com/user-attachments/assets/89477b56-1305-494a-bf09-f370b598d4f0)

Entity-Relationship Diagram (ERD) Explanation
This section explains the entities and relationships within our music database system, as illustrated in the ER diagram. The ERD helps structure and manage the different entities involved in our application. Below is a breakdown of the entities and their relationships.

. Entities and Attributes
SONG
- Item 1 Represents each individual song in the system.
- Item 1 Attributes:
  - Item 1 song_name: Name of the song.
  - Item 1 listen_count: Number of times the song has been played.
  - Item 1 rate: Rating of the song.
  - Item 1 Linked to SONG_TYPE, WRITER, and SINGER.
WRITER
-Item 1 Represents songwriters.
- Item 1 Attributes:
  - Item 1 writer_name: Name of the songwriter.
  -Item 1 writer_description: Additional details about the writer.
  -Item 1 writer_id: Unique identifier for each writer.
  -Item 1 Connected to SONG via the song_writer relationship.
SINGER
- Item 1 Represents singers or performers of the song.
- Item 1 Attributes:
  - Item 1 singer_name: Name of the singer.
  - Item 1 day_of_birth: Date of birth of the singer.
  - Item 1 hometown: Hometown of the singer.
 - Item 1 singer_description: Additional description of the singer.
ALBUM
- Item 1 Represents music albums that contain multiple songs.
- Item 1 Attributes:
  - Item 1 album_name: Name of the album.
  - Item 1 date_release_album: Release date of the album.
  - Item 1 album_description: Description of the album.
SONG_TYPE
- Item 1 Represents the genre or type of the song.
- Item 1 Attributes:
   - Item 1 type_name: Genre or type of the song (e.g., Pop, Jazz, Rock).
   - Item 1 description: A brief description of the genre.
 
2. Relationships
song_writer
- Item 1 Defines a many-to-many relationship between SONG and WRITER.
- Item 1 Each song can have multiple writers, and each writer can write multiple songs.
- Item 1 Linked by song_id and writer_id.
BEGIN
- Item 1 Represents the relationship between a SONG, a SINGER, and an ALBUM.
- Item 1 A song is performed by a singer and is part of an album.
- Item 1 Attributes:
   - Item 1 date: The date when the song was recorded.
   - Item 1 location: The location where the song was recorded.

3. Data Flow
- Item 1 Each SONG is connected to a specific SONG_TYPE for classification.
- Item 1 A SONG is written by one or more WRITER(s) and performed by one or more SINGER(s).
- Item 1 Songs are grouped into ALBUMS, and each album contains multiple songs.
- Item 1 The relationships allow for complex queries, such as:
- Item 1 Retrieving all songs written by a particular writer.
- Item 1 Finding all songs within a specific album or genre.

![image](https://github.com/user-attachments/assets/a5bc34c0-4222-4e64-874e-54df06ba11e9)

### **Design table and checkpoint after run project**
![image](https://github.com/user-attachments/assets/74452201-a0bb-45bb-8ec6-b1315ac6b07e)

![image](https://github.com/user-attachments/assets/a67ff3df-192e-43c2-9b72-1453503d2c60)

![image](https://github.com/user-attachments/assets/39cd2479-8a6a-478f-8875-b1f89334922c)

![image](https://github.com/user-attachments/assets/d7ea9a3e-094b-41cf-a26a-9807604c8e65)

![image](https://github.com/user-attachments/assets/653f7b8a-a852-4cd5-9965-eb6f4ba5af58)



