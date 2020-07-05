<?php
require('./svg-foreign-objects.php');

// Original Google Drawing
// https://docs.google.com/drawings/d/1vcc98SKqZzhO9F_WpBv5_eF7UuSfTjgC-n387vRi0kM/edit
$svg = file_get_contents('./Chat-design-demo.svg');

// Remove Google redirects from Google Drawings URLs
$svg = preg_replace('/https:\/\/www.google.com\/url\?q\=([^&]*)&[^"]*"/', '$1"', $svg);

// Add foreign objects so we can output HTML into parts of SVG
$svg = str_replace("</svg>", "$svgForeignObjects</svg>", $svg);

header("Content-type", "image/svg+xml");

echo $svg;