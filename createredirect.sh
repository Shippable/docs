#!/bin/bash
content='<meta http-equiv="refresh" content="0; url=redirect" />'
#echo $content
while IFS='' read -r line || [[ -n "$line" ]]; do
#    echo "Text read from file: $line"
    token=0
    indexfile=''
    for component in $line
    do
      ((token++))
      #echo $token
      #echo $component
      if [[ "$token" == 1 ]]; then
        #create the file
        indexfile=./$2/$component/index.html
        #echo $indexfile
        mkdir -p ./$2/$component
        touch $indexfile
      else
        #add redirect command to file
        ecapedValue=$(echo ${component} | sed -e "s#/#\\\/#g")
        #echo $ecapedValue
        echo $content | sed "s/redirect/${ecapedValue}/g" >> $indexfile
      fi
    done
done < "$1"
