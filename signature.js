Vue.component('PromotionInput', {
    data: function() {
        return {
            years: Array.from((function*(start, stop) {
              for (var i = start; i < stop; i++) yield i;
            })(2000, (new Date()).getFullYear() + 3)),
            majors: ['MRI', 'STI', 'ERE']
        }
    },
    props: {
        value: {
            type: Object,
            required: true,
        }
    },
    template: `
        <div class="input-group">
            <select class="form-control custom-select" v-model="value.year">
                <option v-for="year in years" v-bind:value="year">{{year}}</option>
            </select>
            <select class="form-control custom-select" v-model="value.major">
                <option v-for="major in majors" v-bind:value="major">{{major}}</option>
            </select>
        </div>
    `
})

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
            promotion: { year: 2010, major: 'MRI' },
            fonction: '',
            email: '',
            emailPerso: '',
            telephone: '',
            liste: 'alumni',
            avecListe: true,
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
