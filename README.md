# Mapbox GL JS experiments

## Mapbox Tile Experiments

Places Map:  https://marybecker.github.io/mapboxGLJS-experiments/places

### U.S. Summits Over 1000 M

Map:  https://marybecker.github.io/mapboxGLJS-experiments/

Data:

[GNIS Data](https://www.usgs.gov/core-science-systems/ngp/board-on-geographic-names/download-gnis-data)


Filter out to get summits.  Filter out only needed fields.
```command
ogr2ogr -f "CSV" -where "FEATURE_CLASS='Summit'" summit.csv NationalFile_20210825.txt
ogr2ogr -f "CSV" -sql "SELECT * FROM summit WHERE CAST(ELEV_IN_M AS integer) > 2999" summit-1000M.csv summit.csv
mapshaper summit-1000M.csv -filter-fields FEATURE_NAME,PRIM_LAT_DEC,PRIM_LONG_DEC,ELEV_IN_M -o format=csv precision=.000001 ../data/summit-1000M.csv
```

Map displays a mountain icon.  Labels appear as you zoom in.  Elevation displayed on mouseover.

## Mapbox Raster Experiments 

Mesa Verde:  https://marybecker.github.io/mapboxGLJS-experiments/compare

### Compare USGS 1892 Topo of EB Farmington Turned to Barkhamsted Reservoir Today

Map:  https://marybecker.github.io/mapboxGLJS-experiments/EBFarmingtonCompare

Data:

[USGS Topo Viewer - Granby, CT Topo](https://ngmdb.usgs.gov/topoview/viewer/#13/41.9419/-72.9761)

Get info on raster file.  Re-project and compress.
```command
$ gdalinfo CT_Granby_331039_1892_62500_geo_tif/CT_Granby_331039_1892_62500_geo.tif
Driver: GTiff/GeoTIFF
Files: CT_Granby_331039_1892_62500_geo_tif/CT_Granby_331039_1892_62500_geo.tif
Size is 4925, 5917
Coordinate System is:
PROJCS["GCS_North_American_1927",
    GEOGCS["NAD27",
        DATUM["North_American_Datum_1927",
            SPHEROID["Clarke 1866",6378206.4,294.9786982138982,
                AUTHORITY["EPSG","7008"]],
            AUTHORITY["EPSG","6267"]],
        PRIMEM["Greenwich",0],
        UNIT["degree",0.0174532925199433],
        AUTHORITY["EPSG","4267"]],
    PROJECTION["Polyconic"],
    PARAMETER["latitude_of_origin",41.75],
    PARAMETER["central_meridian",-72.875],
    PARAMETER["false_easting",0],
    PARAMETER["false_northing",0],
    UNIT["metre",1,
        AUTHORITY["EPSG","9001"]]]
Origin = (-12915.841023989949463,29425.976330447098007)
Pixel Size = (5.291666666666667,-5.291666666666667)
Metadata:
  AREA_OR_POINT=Area
  TIFFTAG_RESOLUTIONUNIT=2 (pixels/inch)
  TIFFTAG_XRESOLUTION=300
  TIFFTAG_YRESOLUTION=300
Image Structure Metadata:
  COMPRESSION=YCbCr JPEG
  INTERLEAVE=PIXEL
  SOURCE_COLOR_SPACE=YCbCr
Corner Coordinates:
Upper Left  (  -12915.841,   29425.976) ( 73d 1'51.33"W, 42d 0'53.38"N)
Lower Left  (  -12915.841,   -1884.815) ( 73d 1'48.87"W, 41d43'58.53"N)
Upper Right (   13145.617,   29425.976) ( 72d42'58.68"W, 42d 0'53.36"N)
Lower Right (   13145.617,   -1884.815) ( 72d43' 1.19"W, 41d43'58.52"N)
Center      (     114.888,   13770.580) ( 72d52'25.02"W, 41d52'26.34"N)
Band 1 Block=512x512 Type=Byte, ColorInterp=Red
  Overviews: 2463x2959, 1232x1480, 616x740, 308x370, 154x185, 77x93, 39x47
Band 2 Block=512x512 Type=Byte, ColorInterp=Green
  Overviews: 2463x2959, 1232x1480, 616x740, 308x370, 154x185, 77x93, 39x47
Band 3 Block=512x512 Type=Byte, ColorInterp=Blue
  Overviews: 2463x2959, 1232x1480, 616x740, 308x370, 154x185, 77x93, 39x47
  
gdalwarp -t_srs EPSG:4326 CT_Granby_331039_1892_62500_geo.tif CT_Granby_331039_1892_62500_geo_WGS84.tif
gdal_translate -co COMPRESS=JPEG -co TILED=YES CT_Granby_331039_1892_62500_geo_WGS84.tif EBFarmington1892.tif
```



