# Docker Compose Servisleri

Bu proje, aşağıdaki servisleri çalıştıran bir Docker Compose yapılandırmasına sahiptir:

- PostgreSQL
- Mosquitto (MQTT)
- InfluxDB

## Başlangıç

Projeyi çalıştırmak için öncelikle Docker ve Docker Compose'un sisteminizde yüklü olması gerekmektedir.

1. **Docker'ı İndirin ve Yükleyin**  
   [Docker İndirme Sayfası](https://www.docker.com/get-started)

2. **Docker Compose'u İndirin ve Yükleyin**  
   [Docker Compose İndirme Sayfası](https://docs.docker.com/compose/install/)

## Servislerin Başlatılması

Projeyi çalıştırmak için aşağıdaki adımları takip edin.

### 1. PostgreSQL Servisi

PostgreSQL servisini çalıştırmak için:

```bash
docker-compose up -d postgres
```
PostgreSQL Servisini Durdurmak
PostgreSQL servisini durdurmak için:
```bash
docker-compose stop postgres
```
PostgreSQL Servisini Kaldırmak
PostgreSQL servisini kaldırmak için:

```bash
docker-compose rm -f postgres
```

PostgreSQL veritabanı verilerini temizlemek için, postgres_data volume'ünü kaldırabilirsiniz:

```bash
docker volume rm posgres_postgres_data
```
### 2. Mosquitto (MQTT) Servisi
Mosquitto servisini çalıştırmak için:
```bash
docker-compose up -d mosquitto
```

Mosquitto Servisini Durdurmak
Mosquitto servisini durdurmak için:

```bash
docker-compose stop mosquitto
```
Mosquitto Servisini Kaldırmak
Mosquitto servisini kaldırmak için:
```bash
docker-compose rm -f mosquitto
```

### 3. InfluxDB Servisi
InfluxDB servisini çalıştırmak için:
```bash
docker-compose up -d influxd
```

InfluxDB servisini durdurmak için:
```bash
docker-compose stop influxdb
```

InfluxDB Servisini Kaldırmak
InfluxDB servisini kaldırmak için:

```bash
docker-compose rm -f influxdb
```

InfluxDB veritabanı verilerini temizlemek için, influxdb_data volume'ünü kaldırabilirsiniz:

```bash
docker volume rm influxdb_influxdb_data
```

### 3. IOT-APP Service
iot servisini çalıştırmak için iot-app klasörüne girilir:
```bash
docker-compose up -d --build
```

iot servisini servisini durdurmak için:
```bash
docker-compose stop nest-app
```

iot servisini Kaldırmak
iot servisini kaldırmak için:

```bash
docker-compose rm -f nest-app
```

### Iot Servisi Ek Bilgiler
Iot servisi için kullanılacak curl'ler "iot-api.postman_collection.json" içinde bulunmaktadır. Bu json postmana import edilerek kullanılabilmektedir.


#### Diğer Bilgiler
PostgreSQL: Veritabanı servisi, bağlantı için 5432 portunu kullanmaktadır.
Mosquitto: MQTT broker servisi, bağlantı için 1883 portunu kullanmaktadır.
InfluxDB: Zaman serisi veritabanı servisi, bağlantı için 8086 portunu kullanmaktadır.
Volümler
Aşağıdaki volümler kullanılır:

postgres_data: PostgreSQL veritabanı verileri için.
influxdb_data: InfluxDB veritabanı verileri için.
Eğer veritabanı verilerini tamamen silmek isterseniz, yukarıdaki adımlarda belirtildiği gibi ilgili volümleri kaldırabilirsiniz.

#### Sorun Giderme
Eğer herhangi bir sorunla karşılaşırsanız, aşağıdaki komutları kullanarak loglara göz atabilirsiniz:


docker-compose logs
Ya da belirli bir servisin loglarını görmek için:

docker-compose logs <servis_adi>
Örneğin, Mosquitto servisi için:
```bash
docker-compose logs mosquitto
```
