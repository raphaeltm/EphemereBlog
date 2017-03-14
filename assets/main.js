---
---

function adBlockDetected() {
    $('.ad-blocked').show();
}


if (typeof blockAdBlock === 'undefined') {
    adBlockDetected();
}
else {
    blockAdBlock.onDetected(adBlockDetected);
}

var searchClient = algoliasearch('{{ site.algolia.application_id }}', '{{ site.algolia.search_key }}')
var pagesIndex = searchClient.initIndex('Pages');
