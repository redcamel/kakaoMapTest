@echo start geoJSON build
call "C:\Program Files\QGIS 3.12\OSGeo4W.bat" start cmd.exe /k exit
ogr2ogr -f GeoJSON -lco COORDINATE_PRECISION=9 -t_srs crs:84 geoJSON_building/result_seoul.json geoJSON_building/source.shp
@echo end geoJSON build

