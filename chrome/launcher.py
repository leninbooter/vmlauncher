#
# Arguments will be in the format:
#									vmlaunch:mstsc:ip
#									vmlaunch:vnc:ip
#									vmlaunch:ssh:ip
#								   	
#

import sys
import subprocess

for arg in sys.argv:	
	if arg <> "launcher.py":
		arg = arg[ arg.index(":") + 1 : arg.__len__() ]
		client = arg[ 0 : arg.index(":") ]
		host = arg[ arg.rindex(":") + 1 : arg.__len__() ]
		
		if client == "mstsc":
			subprocess.call("mstsc -v:" + host)
		elif client == "vnc":
			subprocess.call("vnc " + host + ":1")
		elif client == "ssh":
			subprocess.call("putty " + host, shell=True)
	