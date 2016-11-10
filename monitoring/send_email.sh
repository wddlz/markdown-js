#!/bin/sh

echo "Running mail script."

IFS=''

while read line
do
echo "Sending mail to " $line
subject="Sending monitoring alert" 
cat $1 | mail -s $subject $line  
done < ./scripts/email_ids
