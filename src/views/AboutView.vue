<script>
import NavbarSmall from '../components/NavbarSmall.vue';

</script>

<template>
    <NavbarSmall></NavbarSmall>
    <div class="container">
        <h1 class="header-common">4-Gewinnt</h1>
        <br/>
        <h3 class="header-common">Infos</h3>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-1" aria-expanded="true" aria-controls="collapseOne">
                        Felder
                    </button>
                </h2>
                <div id="collapse-1" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <li><b>Silber</b>: Feld wurde noch nicht gesetzt</li>
                        <li><b>Gold</b>: Spieler 1 hat einen Stein gesetzt</li>
                        <li><b>Kupfer</b>: Spieler 2 hat einen Stein gesetzt</li>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-2" aria-expanded="false" aria-controls="collapseTwo">
                        Spielablauf
                    </button>
                </h2>
                <div id="collapse-2" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ul>
                            <li>Für 2 Spieler</li>
                            <li>Jeder Spieler setzt abwechselnd einen Stein</li>
                            <li>Ziel ist es, 4 Steine eines Spielers in eine Linie zu bringen, dabei ist es egal, ob diese vertikal, horizontal oder diagonal sind</li>
                            <li>Ist ein Spieler an der Reihe, darf er mit den Eingabefeldern unten einen Stein setzen</li>
                            <li>Gewonnen hat der Spieler, der als erstes alles 4 seiner Steine in einer Reihe hat</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-3" aria-expanded="false" aria-controls="collapseThree">
                        Geschichte des Spiels
                    </button>
                </h2>
                <div id="collapse-3" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ul>
                            <li>Das Spiel wurde 1974 von den Entwicklern Howard Wexler und Ned Strongin erfunden und 1974 von der Strongin & Wexler Corp. lizenziert und 1974 veröffentlicht.</li>
                            <li>Die Entstehung des Spiels fällt in eine Zeit, als Gesellschaftsspiele populär wurden. Die Menschen suchten nach unterhaltsamen Aktivitäten, um sich in der Freizeit zu beschäftigen</li>
                            <li>Das Spiel hat sich zu einem wichtigen kulturellen Erbe entwickelt und ist ein Teil der deutschen Spieltradition</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<style scoped>

</style>