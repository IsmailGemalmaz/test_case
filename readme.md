


docker image create ==> sudo docker build --tag test_case .
docker run ==> sudo docker run -p 3000:3000 test_case
Run ==> npm run build
        npm run start
Run ==> pm2 start pm2Cron.json

PROJE MİMARİSİ ==> structure.png içerisinde

!!!!! node_modules dosyasını silip tekrar yükleyin --> npm install !!!!!!!!!
!!!!!!!! src/constant/ProjectSettings.ts (PROD)  içersine database bilgilerinizi giriniz !!!!!!! 
!!!!!!!! docker ile projeyi çalıştırmak için src/constant/ProjectSettings.ts dosyası içinden DATABASE_HOST_PROD'a kendi local ip adresinizi giriniz !!!!!!!
!!!!!!! port değişimi ve ip değişimi yapılırsa swagger/openApi.json host kısmını güncelleyin !!!!!
 
 
swagger link =>http://localhost:3000/api-docs/#/
