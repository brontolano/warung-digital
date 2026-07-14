INSERT INTO users VALUES ('admin-1','admin@warung.com','$2b$12$demo','Warung Demo','Admin','62812','owner','pro',NOW(),NOW(),true);
INSERT INTO stores VALUES ('store-1','admin-1','Warung Demo','warung-demo',NOW(),NOW(),true);
INSERT INTO categories VALUES
 ('cat-1','store-1','Makanan Ringan',null,1,true,NOW()),
 ('cat-2','store-1','Minuman',null,2,true,NOW()),
 ('cat-3','store-1','Sembako',null,3,true,NOW());
INSERT INTO products VALUES
 ('prod-1','store-1','Indomie Goreng','89910021','cat-1',2500,3500,100,20,'pcs',true,NOW()),
 ('prod-2','store-1','Aqua 600ml','89927521','cat-2',3000,5000,50,10,'pcs',true,NOW());
INSERT INTO price_tiers VALUES
 ('tier-1','prod-1','HET',1,3500,true,NOW()),
 ('tier-2','prod-1','T1',10,3200,true,NOW()),
 ('tier-3','prod-1','T2',50,3000,true,NOW());
