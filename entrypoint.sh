#!/bin/bash

# Start the first process
cd /app/server && yarn start:prod &

  
# Start the second process
#./my_second_process &
cd /app/client && yarn start &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?