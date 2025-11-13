FROM php:7.2.2-apache

# Install mysqli extension and enable recommended apache modules
RUN docker-php-ext-install mysqli \
	&& a2enmod headers

# Ensure .htaccess files are respected by allowing overrides for the web root.
# We add a small conf file and enable it.
RUN printf "<Directory /var/www/html/>\n    AllowOverride All\n</Directory>\n" > /etc/apache2/conf-available/allow-override.conf \
	&& a2enconf allow-override

# Expose port 80 (docker-compose handles published ports)
EXPOSE 80