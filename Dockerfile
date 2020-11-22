FROM nginx

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    python3-dev \
    python3-setuptools \
    python3-virtualenv \
    python3-pip \
    build-essential \
    g++ \
    curl \
    gnupg \
    supervisor && \
    rm -rf /var/lib/apt/lists/*

# Install node
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Install uwsgi
RUN pip3 install wheel
RUN pip3 install uwsgi

WORKDIR /usr/share/nginx

# Copy the source files
RUN mkdir subzero && chown -R nginx subzero
COPY --chown=nginx static subzero/static/
COPY --chown=nginx subzero subzero/subzero/
COPY --chown=nginx deploy subzero/deploy/
COPY --chown=nginx manage.py subzero/manage.py
COPY --chown=nginx requirements.txt subzero/requirements.txt

# Build the virtualenv
RUN python3 -m virtualenv --python=/usr/bin/python3 subzero/vp

# Install the python requirements in the virtualenv
RUN . subzero/vp/bin/activate && \
    pip install -r subzero/requirements.txt

# Build the JS bundle
RUN cd subzero/static/js && npm install && npm start

# Collect the static files
RUN . subzero/vp/bin/activate && \
    subzero/manage.py collectstatic --noinput

# Configure nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx.conf /etc/nginx/conf.d/streamer.conf

ENTRYPOINT ["supervisord", "-c", "subzero/deploy/supervisord.conf"]
