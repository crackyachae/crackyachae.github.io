#!/usr/bin/env bash

RES_LIST=` find ./post-img -type f`

for FILE in $RES_LIST; do
    # echo $FILE
    FILE_PATH=`echo $FILE | sed "s/^\.//"`
    DIARY_COUNT=`grep -r "$FILE_PATH"  _diary | wc -l`
    PROJECT_COUNT=`grep -r "$FILE_PATH"  _project | wc -l`
    PSCODE_COUNT=`grep -r "$FILE_PATH"  _pscode | wc -l`
    STUDY_COUNT=`grep -r "$FILE_PATH"  _study | wc -l`
    BLOG_COUNT=`grep -r "$FILE_PATH"  _posts | wc -l`

    FOUND_COUNT=$(($DIARY_COUNT + $PROJECT_COUNT + $PSCODE_COUNT + $STUDY_COUNT + $BLOG_COUNT))

    if [[ "$FOUND_COUNT" -eq "0" ]]; then
        echo ".$FILE_PATH"
    fi
done
