// check that the userId specified owns the doc
ownsDocument = function(userId, doc){
	return doc && doc.userId === userId;
}