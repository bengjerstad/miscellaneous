objectlist = []

def parse(sentence,noun,verb,adverb1):
	wordlist = sentence.split(" ")
	thisword = wordlist[0]
	#if thisword is 'on', then next word is the noun
	if thisword == 'on':
		noun = wordlist[1]
		#if wordlist is greater than 2 then we must have a verb
		if len(wordlist) > 2:
			trash,verb,adverb1 = parse(" ".join(wordlist[2:]),noun,verb,adverb1)
	#if thisword is not 'on', then this is a verb. If noun is not set yet, then next word is the noun if noun is set then this is an adverb
	else:
		verb = thisword
		if len(wordlist) > 1:
			if noun == '' and len(objectlist) == 0:
				noun = wordlist[1]
			else:
				adverb1 = " ".join(wordlist[1:])
	return noun,verb,adverb1
	
		
def do(noun,verb,adverb1):
	global objectlist
	#print("N: ",noun, "V: ",verb, "Adv: ",adverb1)
	if noun != "" and verb == "":
		if noun == 'clear':
			objectlist = []
			print("Cleared Objectlist!")
		else:
			objectlist.append(noun)
			print("Appended: ",noun)
	if noun == "" and verb != "":
		if len(objectlist) == 0:
			print('Single Verb: ',verb)
		else:
			for object in objectlist:
				do(object,verb,adverb1)
	if noun != "" and verb != "":
		if verb == 'p' or verb == 'ping':
			print("Ping: ",noun)
		if verb == 'r' or verb == 'run':
			print("Run: ",adverb1, " on ",noun)
			#run the command verbatim.
		if verb == 'g' or verb == 'get':
			print("Get: ",adverb1, " on ",noun)
			#adverbs: user, os, proccess list, ect.
		else:
			print("DO: ",verb, " on ", noun)
	
while 1:
	sentence = input(">>")
	noun,verb,adverb1 = parse(sentence,'','','')
	do(noun,verb,adverb1)
	print(objectlist)
