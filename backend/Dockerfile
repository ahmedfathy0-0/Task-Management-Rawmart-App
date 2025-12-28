FROM php:8.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libsqlite3-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . /var/www

# Create SQLite database file
RUN mkdir -p database && touch database/database.sqlite && chown -R www-data:www-data database && chmod -R 775 database

# Install dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev --no-scripts

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
