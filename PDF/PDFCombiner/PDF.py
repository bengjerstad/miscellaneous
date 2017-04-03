from PyPDF2 import PdfFileWriter, PdfFileReader
import os
import datetime

output = PdfFileWriter()
input=[]
today='{dt.month}-{dt.day}-{dt.year}'.format(dt = datetime.datetime.now())

files = os.listdir('files')
for file in files:
	input = PdfFileReader(open("files/"+file, "rb"))
	for idx,x in enumerate(input.pages):
			output.addPage(input.getPage(idx))
			
outputStream = open(today+".pdf", "wb")
output.write(outputStream)
