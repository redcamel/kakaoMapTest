@echo start geoJSON build
call "C:\Program Files\QGIS 3.12\OSGeo4W.bat" start cmd.exe /k exit
ogr2ogr -f GeoJSON -lco COORDINATE_PRECISION=3 -t_srs crs:84 geoJSON_year/result/201905/sd/result.json geoJSON_year/sd/CTPRVN_201905/source.shp
ogr2ogr -f GeoJSON -lco COORDINATE_PRECISION=3 -t_srs crs:84 geoJSON_year/result/201905/sgg/result.json geoJSON_year/sgg/SIG_201905/source.shp
ogr2ogr -f GeoJSON -lco COORDINATE_PRECISION=3 -t_srs crs:84 geoJSON_year/result/201905/emd/result.json geoJSON_year/emd/EMD_201905/source.shp
@echo end geoJSON build

