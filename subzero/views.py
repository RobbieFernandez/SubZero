from django.shortcuts import render
from django.conf import settings

def stream(request, stream_name):
    return render(
        request,
        'stream.html',
        {
            'stream_url': f"http://{settings.ICECAST_BASE_URL}/{stream_name}.mp3"
        }
    )