# Mapbox GL JS experiments

## Datasets

[GNIS Data](https://www.usgs.gov/core-science-systems/ngp/board-on-geographic-names/download-gnis-data)

## Mapbox Tile Experiment - U.S. Summits Over 1000 M

Filter out to get summits.  Filter out only needed fields.
```command
ogr2ogr -f "CSV" -where "FEATURE_CLASS='Summit'" summit.csv NationalFile_20210825.txt
ogr2ogr -f "CSV" -sql "SELECT * FROM summit WHERE CAST(ELEV_IN_M AS integer) > 2999" summit-1000M.csv summit.csv
mapshaper summit-1000M.csv -filter-fields FEATURE_NAME,PRIM_LAT_DEC,PRIM_LONG_DEC,ELEV_IN_M -o format=csv precision=.000001 ../data/summit-1000M.csv
```

Map displays a mountain icon.  Labels appear as you zoom in.  Elevation displayed on mouseover.
