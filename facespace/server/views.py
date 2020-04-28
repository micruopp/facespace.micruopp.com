from django.shortcuts import render

def index(request):
	filename = 'index.html'
	context = {}
	return render(request, filename, context=context)