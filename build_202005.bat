@echo start geoJSON build
call "C:\Program Files\QGIS 3.12\OSGeo4W.bat" start cmd.exe /k exit
ogr2ogr -f GeoJSON -lco COORDINATE_PRECISION=3 -t_srs crs:84 geoJSON_year/result/202005/sd/result.json geoJSON_year/sd/CTPRVN_202005/source.shp
ogr2ogr -f GeoJSON -lco COORDINATE_PRECISION=3 -t_srs crs:84 geoJSON_year/result/202005/sgg/result.json geoJSON_year/sgg/SIG_202005/source.shp
ogr2ogr -f GeoJSON -lco COORDINATE_PRECISION=3 -t_srs crs:84 geoJSON_year/result/202005/emd/result.json geoJSON_year/emd/EMD_202005/source.shp
@echo end geoJSON build

