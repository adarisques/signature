var annees = function(start) {
    let liste = [];
    for (let i = start; i <= (new Date()).getFullYear() + 3; i++) {
        liste.push(i);
    }
    Object.freeze(liste);
    return liste;
}

var toast = function (target, text) {
    let el = document.querySelector(target);
    el.innerText = text;
    el.classList.remove('invisible');
    setTimeout(() => { el.classList.add('invisible'); }, 3000);
}

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
            annees: annees(2000)
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
                const parsed = JSON.stringify(data);
                localStorage.setItem('adaSignature', parsed);
            }
        }
    });

    new ClipboardJS('.btn-primary', {
        target: function(trigger) {
            toast("#notification", "Signature hypertexte copiée");
            return document.querySelector("#content");
        }
    });
    new ClipboardJS('.btn-secondary', {
        text: function(trigger) {
            toast("#notification", "Code source de la signature copié");
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
