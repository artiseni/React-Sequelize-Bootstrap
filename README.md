# React-Sequelize-Bootstrap

1. gunakan postgres sql sebagai database
2. buat database dengan nama appdata, dan buat user baru dengan nama linux dan 'password' sebagai passwordnya
3. buat table users dan posts
4. table users memiliki kolom atau column :
  4.1 id (PK), username (varchar), email (varchar), password (varchar), createdAt (date) dan updatedAt (date)
  4.2 untuk datapat membuat tambel dengan camleCase style gunakan tanda kutip. exp : "createdAt"
5. untuk table opsts :
  5.1 id (PK), userId (integer), title (text), content(text), createdAt (date) dan updatedAt (date)
