'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">blog_poster_api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-62f2eca97edb8b03ccf9bf101b91f1b1cf13bbecbd6fb1d3fb17e80291ccccb0251b47dbce1e579390313ff07dc8c211809feee7d09bb3f5cc8c4d959ba29c0c"' : 'data-bs-target="#xs-controllers-links-module-AppModule-62f2eca97edb8b03ccf9bf101b91f1b1cf13bbecbd6fb1d3fb17e80291ccccb0251b47dbce1e579390313ff07dc8c211809feee7d09bb3f5cc8c4d959ba29c0c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-62f2eca97edb8b03ccf9bf101b91f1b1cf13bbecbd6fb1d3fb17e80291ccccb0251b47dbce1e579390313ff07dc8c211809feee7d09bb3f5cc8c4d959ba29c0c"' :
                                            'id="xs-controllers-links-module-AppModule-62f2eca97edb8b03ccf9bf101b91f1b1cf13bbecbd6fb1d3fb17e80291ccccb0251b47dbce1e579390313ff07dc8c211809feee7d09bb3f5cc8c4d959ba29c0c"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-62f2eca97edb8b03ccf9bf101b91f1b1cf13bbecbd6fb1d3fb17e80291ccccb0251b47dbce1e579390313ff07dc8c211809feee7d09bb3f5cc8c4d959ba29c0c"' : 'data-bs-target="#xs-injectables-links-module-AppModule-62f2eca97edb8b03ccf9bf101b91f1b1cf13bbecbd6fb1d3fb17e80291ccccb0251b47dbce1e579390313ff07dc8c211809feee7d09bb3f5cc8c4d959ba29c0c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-62f2eca97edb8b03ccf9bf101b91f1b1cf13bbecbd6fb1d3fb17e80291ccccb0251b47dbce1e579390313ff07dc8c211809feee7d09bb3f5cc8c4d959ba29c0c"' :
                                        'id="xs-injectables-links-module-AppModule-62f2eca97edb8b03ccf9bf101b91f1b1cf13bbecbd6fb1d3fb17e80291ccccb0251b47dbce1e579390313ff07dc8c211809feee7d09bb3f5cc8c4d959ba29c0c"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-93d424ca52137540e011742787dcf6def55ba8efd5cd8b83890314f79630d781ab493e26c71ea91b6343cc73cf44eee71f8372c92ad422d79b3664384572ea7e"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-93d424ca52137540e011742787dcf6def55ba8efd5cd8b83890314f79630d781ab493e26c71ea91b6343cc73cf44eee71f8372c92ad422d79b3664384572ea7e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-93d424ca52137540e011742787dcf6def55ba8efd5cd8b83890314f79630d781ab493e26c71ea91b6343cc73cf44eee71f8372c92ad422d79b3664384572ea7e"' :
                                            'id="xs-controllers-links-module-AuthModule-93d424ca52137540e011742787dcf6def55ba8efd5cd8b83890314f79630d781ab493e26c71ea91b6343cc73cf44eee71f8372c92ad422d79b3664384572ea7e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-93d424ca52137540e011742787dcf6def55ba8efd5cd8b83890314f79630d781ab493e26c71ea91b6343cc73cf44eee71f8372c92ad422d79b3664384572ea7e"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-93d424ca52137540e011742787dcf6def55ba8efd5cd8b83890314f79630d781ab493e26c71ea91b6343cc73cf44eee71f8372c92ad422d79b3664384572ea7e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-93d424ca52137540e011742787dcf6def55ba8efd5cd8b83890314f79630d781ab493e26c71ea91b6343cc73cf44eee71f8372c92ad422d79b3664384572ea7e"' :
                                        'id="xs-injectables-links-module-AuthModule-93d424ca52137540e011742787dcf6def55ba8efd5cd8b83890314f79630d781ab493e26c71ea91b6343cc73cf44eee71f8372c92ad422d79b3664384572ea7e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-175747e378422ad714cf711c70fabe0eb75ae607fcec7b90abc5190b6c4267a5de364403b758d06e6b0794ad61c1bbf92ed77ae26ccc20e8eac3dc18e296c5cb"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-175747e378422ad714cf711c70fabe0eb75ae607fcec7b90abc5190b6c4267a5de364403b758d06e6b0794ad61c1bbf92ed77ae26ccc20e8eac3dc18e296c5cb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-175747e378422ad714cf711c70fabe0eb75ae607fcec7b90abc5190b6c4267a5de364403b758d06e6b0794ad61c1bbf92ed77ae26ccc20e8eac3dc18e296c5cb"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-175747e378422ad714cf711c70fabe0eb75ae607fcec7b90abc5190b6c4267a5de364403b758d06e6b0794ad61c1bbf92ed77ae26ccc20e8eac3dc18e296c5cb"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-175747e378422ad714cf711c70fabe0eb75ae607fcec7b90abc5190b6c4267a5de364403b758d06e6b0794ad61c1bbf92ed77ae26ccc20e8eac3dc18e296c5cb"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-175747e378422ad714cf711c70fabe0eb75ae607fcec7b90abc5190b6c4267a5de364403b758d06e6b0794ad61c1bbf92ed77ae26ccc20e8eac3dc18e296c5cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-175747e378422ad714cf711c70fabe0eb75ae607fcec7b90abc5190b6c4267a5de364403b758d06e6b0794ad61c1bbf92ed77ae26ccc20e8eac3dc18e296c5cb"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-175747e378422ad714cf711c70fabe0eb75ae607fcec7b90abc5190b6c4267a5de364403b758d06e6b0794ad61c1bbf92ed77ae26ccc20e8eac3dc18e296c5cb"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-ef0e01c215588cb0ec74d45f0b52595e7b0961b6aa589a3edd8e5c75f0475390ee9c67d41dc9cbd3249887f434abe978ce7dfa98546a54adfacd1312a4380e74"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-ef0e01c215588cb0ec74d45f0b52595e7b0961b6aa589a3edd8e5c75f0475390ee9c67d41dc9cbd3249887f434abe978ce7dfa98546a54adfacd1312a4380e74"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-ef0e01c215588cb0ec74d45f0b52595e7b0961b6aa589a3edd8e5c75f0475390ee9c67d41dc9cbd3249887f434abe978ce7dfa98546a54adfacd1312a4380e74"' :
                                            'id="xs-controllers-links-module-PostsModule-ef0e01c215588cb0ec74d45f0b52595e7b0961b6aa589a3edd8e5c75f0475390ee9c67d41dc9cbd3249887f434abe978ce7dfa98546a54adfacd1312a4380e74"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-ef0e01c215588cb0ec74d45f0b52595e7b0961b6aa589a3edd8e5c75f0475390ee9c67d41dc9cbd3249887f434abe978ce7dfa98546a54adfacd1312a4380e74"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-ef0e01c215588cb0ec74d45f0b52595e7b0961b6aa589a3edd8e5c75f0475390ee9c67d41dc9cbd3249887f434abe978ce7dfa98546a54adfacd1312a4380e74"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-ef0e01c215588cb0ec74d45f0b52595e7b0961b6aa589a3edd8e5c75f0475390ee9c67d41dc9cbd3249887f434abe978ce7dfa98546a54adfacd1312a4380e74"' :
                                        'id="xs-injectables-links-module-PostsModule-ef0e01c215588cb0ec74d45f0b52595e7b0961b6aa589a3edd8e5c75f0475390ee9c67d41dc9cbd3249887f434abe978ce7dfa98546a54adfacd1312a4380e74"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' :
                                            'id="xs-controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' :
                                        'id="xs-injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-a67c56a67f1ef60b772ea7f14062d4d6fee0bf86d5e5fa83b032ca9da800a60423693933e8506bf6355c0fc4bb40757795ccabb17ce2466dd7347ee9172ce296"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-a67c56a67f1ef60b772ea7f14062d4d6fee0bf86d5e5fa83b032ca9da800a60423693933e8506bf6355c0fc4bb40757795ccabb17ce2466dd7347ee9172ce296"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-a67c56a67f1ef60b772ea7f14062d4d6fee0bf86d5e5fa83b032ca9da800a60423693933e8506bf6355c0fc4bb40757795ccabb17ce2466dd7347ee9172ce296"' :
                                            'id="xs-controllers-links-module-UsersModule-a67c56a67f1ef60b772ea7f14062d4d6fee0bf86d5e5fa83b032ca9da800a60423693933e8506bf6355c0fc4bb40757795ccabb17ce2466dd7347ee9172ce296"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-a67c56a67f1ef60b772ea7f14062d4d6fee0bf86d5e5fa83b032ca9da800a60423693933e8506bf6355c0fc4bb40757795ccabb17ce2466dd7347ee9172ce296"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-a67c56a67f1ef60b772ea7f14062d4d6fee0bf86d5e5fa83b032ca9da800a60423693933e8506bf6355c0fc4bb40757795ccabb17ce2466dd7347ee9172ce296"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-a67c56a67f1ef60b772ea7f14062d4d6fee0bf86d5e5fa83b032ca9da800a60423693933e8506bf6355c0fc4bb40757795ccabb17ce2466dd7347ee9172ce296"' :
                                        'id="xs-injectables-links-module-UsersModule-a67c56a67f1ef60b772ea7f14062d4d6fee0bf86d5e5fa83b032ca9da800a60423693933e8506bf6355c0fc4bb40757795ccabb17ce2466dd7347ee9172ce296"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MetaOptionsController.html" data-type="entity-link" >MetaOptionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TagsController.html" data-type="entity-link" >TagsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionDto.html" data-type="entity-link" >CreatePostMetaOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MetaOptionsService.html" data-type="entity-link" >MetaOptionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TagsService.html" data-type="entity-link" >TagsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});