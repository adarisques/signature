var annees = [];
for (let i = 2000; i <= (new Date()).getFullYear() + 3; i++) {
    annees.push(i);
}


window.addEventListener('load', function() {
    var app = new Vue({
        el: '#container',
        data: {
            prenom: '',
            nom: '',
            annee: '2000',
            filiere: 'MRI',
            fonction: '',
            email: '',
            telephone: '',
            annees: annees
        },
        methods: {
            copy: function(e) {
                navigator.clipboard.writeText(document.querySelector("#content").textContent);
            }
        }
    })
})
