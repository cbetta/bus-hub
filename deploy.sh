rsync -avog --rsync-path="sudo rsync" --exclude=".*/" --exclude="passenger*" --exclude="*.sh" ./ momo:/var/www/bus-dash/
