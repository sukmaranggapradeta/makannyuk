'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:    
    */
   return queryInterface.bulkInsert('Food', [{
    food_name: 'Mie Aceh',
    picture: null,
    description: `Salah satu ciri khas resep mie goreng dari Aceh ini adalah bentuk mie yang 
    digunakan kelihatan lebih besar dan tebal. Hal ini lah yang membuat banyak penggemar 
    kuliner selalu puas saat menikmati resep mie Aceh yang juga dengan mudah bisa kita 
    temukan di Jakarta, Bandung, Surabaya atau daerah lainnya. Selain menggunakan mie khusus 
    (bisa juga memakai mie telor biasa kalau tidak ada) dan bumbu mie yang lengkap, 
    campuran isiannya memang lebih bergizi. Ya, buat teman teman yang kebetulan memang 
    menyukai masakan ini, pasti tahu bahwa isian dari resep ini lebih bergizi dibandingkan 
    dengan mie yang lain. Sebut saja udang, daging sapi, jeroan ataupun daging kambing yang 
    banyak mengadung protein dan gizi penting buat kebutuhan tubuh sehari hari.`,
    UserId: 1,
    CategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    food_name: 'Hamburger kaepseh',
    picture: null,
    description: `Hamburger (atau seringkali disebut dengan burger) adalah sejenis makanan berupa roti berbentuk 
    bundar yang diiris dua dan ditengahnya diisi dengan patty yang biasanya di ambil dari daging, 
    kemudian sayur-sayuran berupa selada, tomat dan bawang bombay.`,
    UserId: 2,
    CategoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    food_name: 'Udang Tepung',
    picture: null,
    description: `Bisa dibilang, udang adalah menu seafood yang paling banyak disukai selain ikan. 
    Rasanya yang kenyal, gurih, dan tidak terlalu amis, menjadikan menu ini digemari berbagai kalangan. 
    Salah satu resep yang paling populer adalah udang goreng tepung.`,
    UserId: 1,
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date()

  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      
    */
   return queryInterface.bulkDelete('Food', null, {});
  }
};
