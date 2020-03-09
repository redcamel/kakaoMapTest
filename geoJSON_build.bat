@echo start geoJSON build
call "C:\Program Files\QGIS 3.12\OSGeo4W.bat" start cmd.exe /k exit
ogr2ogr -f GeoJSON -t_srs crs:84 geoJSON/sido/result.json geoJSON/sido/source.shp
ogr2ogr -f GeoJSON -t_srs crs:84 geoJSON/sigungu/result.json geoJSON/sigungu/source.shp
@echo end geoJSON build

