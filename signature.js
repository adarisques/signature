console.log("Hello " + (new Date()).toISOString());

var annees = [];
for (let i = 2000; i <= (new Date()).getFullYear() + 3; i++) {
    annees.push(i);
}
Object.freeze(annees);

window.addEventListener('load', function() {
    new Vue({
        el: '#container',
        data: {
            prenom: '',
            nom: '',
            annee: '2000',
            filiere: 'MRI',
            fonction: '',
            email: '',
            emailPerso: '',
            telephone: '',
            annees: annees
        },
        mounted() {
            if (localStorage.getItem('adaSignature')) {
                try {
                    var data = JSON.parse(localStorage.getItem('adaSignature'));
                    Object.getOwnPropertyNames(data).forEach(key => {
                        this[key] = data[key];
                    });
                } catch(e) {
                    localStorage.removeItem('adaSignature');
                }
            }
        },
        methods: {
            save: function(event) {
                event.preventDefault();

                var data = Object.assign({}, this.$data);
                delete data.annees;
                console.log(data);

                const parsed = JSON.stringify(data);
                localStorage.setItem('adaSignature', parsed);
            }
        }
    });

    new ClipboardJS('.btn-primary', {
        target: function(trigger) {
            return document.querySelector("#content");
        }
    });
    new ClipboardJS('.btn-secondary', {
        text: function(trigger) {
            return document.querySelector("#content").innerHTML
                .replace(/\n +/g, " ")
                .replace(/(<br>) */g, "$1\n")
                .replace(/(<\/p>) */g, "$1\n")
                .replace(/(<\/a>)(<\/p>) */g, "$1\n$2")
                .replace(/(<p[^>]+>) */g, "$1\n")
                .replace(/(<div[^>]+>) */g, "$1\n")
                .replace(/(<\/?span>) */g, "")
                .replace(/\n */g, "\n")
        }
    });
});
