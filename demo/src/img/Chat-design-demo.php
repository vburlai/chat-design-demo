<?php
require('./svg-foreign-objects.php');
$svg = file_get_contents('./Chat-design-demo.svg');

// Remove Google redirects from Google Drawings URLs
$svg = preg_replace('/https:\/\/www.google.com\/url\?q\=([^&]*)&[^"]*"/', '$1"', $svg);

// Add foreign objects
$svg = str_replace("</svg>", "$svgForeignObjects</svg>", $svg);

header("Content-type", "image/svg+xml");

echo $svg;