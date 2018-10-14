from Naked.toolshed.shell import execute_js


def ins_name():
	success = execute_js('insert.js')


ins_name()