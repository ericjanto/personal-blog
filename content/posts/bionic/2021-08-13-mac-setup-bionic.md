---
title: Mac setup
bionic: true
---

I __recent__ly __ra__n __ou__t __o__f __har__d __dri__ve __memo__ry __spa__ce __an__d __coul__dn't __b__e __bother__ed __t__o __tra__ck __dow__n __an__d __uninsta__ll __al__l __th__e __clutt__er __tha__t __accumulat__ed __ove__r __tw__o __yea__rs __o__f __softwa__re __developme__nt. __Hen__ce, I __res__et __m__y __MacBo__ok. I __use__d __thi__s __occasi__on __t__o __crea__te a __ste__p-__b__y-__ste__p __gui__de __o__n __ho__w __exact__ly I __res__et __m__y __ma__c. __I__t __ca__n __als__o __b__e __use__d __a__s a __migrati__on __gui__de __fro__m __on__e __ma__c __t__o __anoth__er __o__r __a__n __explanati__on __o__f __ho__w __t__o __se__t __u__p a __ne__w __ma__c.

![Screenshot of my doc](../../images/mac-setup-2021-08-13.png)

### __Preparati__on

1.  __D__o a [__Tim__e __Machi__ne __Back__up](https://support.apple.com/en-gb/HT201250), __savi__ng __i__t __o__n __a__n __extern__al __har__d __dri__ve. __I__t's __alwa__ys __wis__e __t__o __d__o __suc__h a __back__up __befo__re __tryi__ng __t__o __app__ly __maj__or __chang__es __t__o __you__r __ma__c.
    __Shou__ld __th__e __extern__al __har__d __dri__ve __b__e __encrypt__ed, __mak__e __sur__e __tha__t __yo__u __hav__en't __sav__ed __th__e __passwo__rd __fo__r __i__t __o__n __you__r __Ma__c __onl__y __s__o __tha__t __yo__u __ca__n __acce__ss __i__t __aft__er __you__r __ma__c __ha__s __bee__n __eras__ed.

2.  __Not__e __wha__t __applicatio__ns __yo__u __wan__t __t__o __kee__p. __Ge__t __ri__d __o__f __tho__se __yo__u __do__n't __nee__d __anymo__re. __D__o __som__e __resear__ch __whe__re __yo__u __ca__n __downlo__ad __the__m __fro__m. __Se__e __th__e __tab__le __a__t __th__e __en__d __o__f __thi__s __pos__t __t__o __se__e __whi__ch __one__s I __cho__se __t__o __kee__p.

3.  __Configurati__ons __o__f __mac__OS __app__s __ar__e __usual__ly __sav__ed __i__n __dotfil__es, i.e. __fil__es __starti__ng __wit__h a __do__t, __lik__e `.bash_profile`. __I__f __yo__u __wan__t __t__o __us__e __tho__se __configurati__ons __fo__r __you__r __ne__w __ma__c, __us__e [__Mack__up](https://github.com/lra/mackup#supported-applications) __t__o __sav__e __th__e __dotfil__es (__i__t's [__wel__l-__document__ed](https://github.com/lra/mackup/tree/master/doc)) __an__d __mak__e __sur__e __t__o __kee__p __the__m __somewhe__re __oth__er __tha__n __th__e __har__d __dri__ve __yo__u'__r__e __abo__ut __t__o __era__se.
    __Onc__e __yo__u __hav__e __everythi__ng __se__t __u__p, __thi__s __shou__ld __b__e __al__l __yo__u __nee__d __t__o __d__o:

        ```bash
        # Old mac
        $ mackup backup
        ```

4.  __Expo__rt __you__r [__netwo__rk __settin__gs](https://support.apple.com/en-gb/guide/mac-help/mchlp2521/mac) __an__d __sav__e __the__m __somewhe__re __exte__rn __i__f __yo__u __wan__t __t__o __kee__p __you__r __VPN__s __et__c.

### __Res__et

__Res__et __you__r __ma__c __followi__ng [__the__se __ste__ps](https://support.apple.com/en-gb/HT201065).

### __Ne__w __Set__up

1.  __Insta__ll __th__e __newe__st __mac__OS.

2.  __Impo__rt __an__d __se__t __you__r __netwo__rk __settin__gs.

3.  __Se__t __mos__t __importa__nt __bas__ic __settin__gs __i__n __you__r __syst__em __preferen__ce __ap__p, __eith__er __b__y __usi__ng __th__e __U__I __o__r a __fil__e __simil__ar __t__o [__m__y `.MacOSX` __fil__e](https://github.com/ericjanto/dotfiles/blob/master/Mackup/.MacOSX):

    ```bash
    $ chmod +x .MacOSX
    $ sh .MacOSX
    ```

    __Th__e __fir__st __comma__nd __giv__es __th__e __fil__e __th__e __necessa__ry __executi__on __permissi__on. __Th__e __seco__nd __comma__nd __execut__es __th__e __scri__pt.

    __Aft__er __tha__t, __resta__rt __you__r __Ma__c.

4.  __Som__e __defau__lt __optio__ns I __hav__e __ye__t __t__o __inclu__de __i__n __th__e `.MacOSX` __fil__e, __the__y __nee__d __manu__al __ste__ps:

    *   __Keyboa__rd > __Inp__ut __Sour__ce > __Germ__an + __Engli__sh (__U__K)

    *   __Langua__ge > __Prima__ry: __U__K

    *   __Trackp__ad
        *   __Poi__nt & __Cli__ck
            *   __Ta__p __t__o __cli__ck
            *   __Cli__ck: __fir__m
            *   __Tracki__ng __spe__ed: __on__e __rig__ht __t__o __midd__le
        *   __Mor__e __Gestur__es
            *   __Ap__p __Exp__oé, __thr__ee __finge__rs __dow__n

    *   __Accessibil__ity
        *   __Point__er __Contr__ol
            *   __Trackp__ad __optio__ns
                *   __Enab__le __draggi__ng → __thr__ee-__fing__er __dra__g

    *   __Chan__ge __locati__on __o__f __whe__re __screensho__ts __ar__e __sav__ed (__i__f __no__t __alrea__dy __don__e __wit__h __th__e __set__up __scri__pt):

        ```bash
        $ cd
        $ cd Documents
        $ mkdir Screenshots
        ```

        *   __Ope__n `Screenshot.app` > __Optio__ns > __Sav__ed __t__o `~/Documents/Screenshots`

    *   __Find__er > __Settin__gs

        *   __Settin__gs > __Ne__w __windo__ws __sho__w > __Downloa__ds
        *   __Sideb__ar > __Unti__ck __iClo__ud __an__d __tag__s
        *   __Advanc__ed __Settin__gs > __Whe__n __performi__ng a __sear__ch > __Sear__ch __curre__nt __fold__er
        *   __Sideb__ar __lik__e __thi__s:

        ![My finder sidebar](../../images/finder-2021-08-13.png)

    *   __Find__er > `cmd + shift + h` > __Se__t __t__o __colu__mn __vie__w > `cmd + j` > __Alwa__ys __colu__mn __vie__w __an__d __brow__se __i__n __colu__mn __vie__w

    *   __Doc__k > __Rig__ht __cli__ck > __Unti__ck "__Sho__w __rece__nt __applicatio__ns __i__n __Doc__k"

    *   __Backgrou__nd: __Downlo__ad __th__e __pho__to __bel__ow > __Downloa__ds > __Rig__ht __cli__ck > __Se__t __a__s __deskt__op __pictu__re
        ![Background photo by joseph lee](../../images/joseph-lee.jpg)

    *   __Choo__se __a__n __exciti__ng __acce__nt __colo__ur:)

5.  __Se__t __u__p a __bas__ic __developme__nt __environme__nt

    ```bash
    # Create minimalist file/project organisation
    $ cd developer
    $ mkdir Projects Uni
    $ cd

    # Set up git
    $ git config --global user.name "your_github_username"

    # Install CLT for Xcode
    $ xcode-select --install

    # Create zsh config file
    $ touch ~/.zshrc

    # Install Homebrew
    $ /bin/zsh -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    $ brew update

    # Install mackup
    $ brew install mackup

    # Clone dotfiles repository
    $ vim ~/.mackup.cfg

    # Set storage in mackup cfg file
    [storage]
    engine = file_system
    path = path/to/dotfiles
    directoy = Mackup

    $ mackup restore

    # Download & install oh-my-zsh
    sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

    # Install node version manager
    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | zsh

    # Install node
    $ nvm install node
    $ nvm use node

    # Install yarn
    $ npm i -g yarn
    ```

    1.  __Insta__ll __th__e __applicatio__ns __yo__u __nee__d. __Do__n't __ope__n __mos__t __o__f __the__m __jus__t __ye__t __a__s __Mack__up __wil__l __resto__re __the__m. I __usual__ly __g__o __wit__h __thi__s __ord__er:
        1.  __Chro__me (__t__o __downlo__ad __oth__er __app__s __vi__a __th__e __we__b)
        2.  __Rayca__st
        3.  __Rectang__le
        4.  __Th__e __res__t __i__n __alphabetic__al __ord__er.
    2.  __Resto__re __ap__p __configurati__ons __wit__h __Mack__up.
        1.  `brew install mackup`
        2.  `mackup restore`
    3.  __Se__t __u__p __Tim__e __Machi__ne.

__Tha__t's __i__t.

| Name                   | Purpose                        | Source                                                                          | Installation Notes                                                                                                                                       |
| ---------------------- | ------------------------------ | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Adobe Lightroom CC     | Photo-editing                  | [__Ado__be __Creati__ve __Clo__ud](https://www.adobe.com/uk/creativecloud/desktop-app.html) |                                                                                                                                                          |
| __Alfr__ed                 | __O__S __Navigati__on + __miscellane__ous  | [__aldreda__pp.__co__m](https://www.alfredapp.com/)                                     |                                                                                                                                                          |
| __Ank__i                   | __Ap__p __fo__r __spac__ed-__repiti__on __syst__em | [__app__s.__ankiw__eb.__ne__t](https://apps.ankiweb.net/)                                   |                                                                                                                                                          |
| __AppClean__er             | __Dele__te __ma__c __app__s __th__e __cle__an __wa__y  | [__freemacso__ft.__ne__t/__appclean__er](https://freemacsoft.net/appcleaner/)               |                                                                                                                                                          |
| __Calib__re                | __Boo__k __manageme__nt __fo__r __m__y __Kind__le  | [__calib__re-__ebo__ok.__co__m/__downlo__ad](https://calibre-ebook.com/download)                |                                                                                                                                                          |
| __Doz__er                  | __Tid__y __men__u __ba__r                  | `brew install --cask dozer`                                                     | `cmd + shift + s` __t__o __togg__le                                                                                                                              |
| __Goog__le __Chro__me          | __Dai__ly __we__b-__browsi__ng + __we__b __de__v   | [__goog__le.__c__o.__u__k/__chro__me](https://www.google.co.uk/chrome/)                         | __Sig__n __int__o __Chro__me __wit__h __you__r __goog__le __accou__nt __t__o __automatica__lly __impo__rt __you__r __bookmar__ks __an__d __extensio__ns </br> </br> __Extensio__ns: __UBlockOrig__in, __DuckDuck__Go, __Vimi__um |
| __Intell__iJ __IDE__A __Ultima__te | __Jav__a __ID__E                       | [__JetBrai__ns __Toolb__ox](https://www.jetbrains.com/toolbox-app/)                     | __Syn__c __optio__ns __fro__m __accou__nt                                                                                                                                |
| __OneDri__ve               | __Clo__ud __Spa__ce                    | __App__le __Ap__p __Sto__re                                                                 |                                                                                                                                                          |
| __PyCha__rm __Profession__al   | __Pyth__on __ID__E                     | [__JetBrai__ns __Toolb__ox](https://www.jetbrains.com/toolbox-app/)                     | __Syn__c __optio__ns __fro__m __accou__nt                                                                                                                                |
| __Qui__ck __Dra__ft            | __Qui__ck __men__u __ba__r __notep__ad         | __App__le __Ap__p __Sto__re                                                                 | `cmd + d`                                                                                                                                                |
| __Rectang__le              | __Wind__ow __resizi__ng + __positioni__ng  | [__rectanglea__pp.__co__m](https://rectangleapp.com/)                                   |                                                                                                                                                          |
| __Spa__rk                  | __Ema__il                          | __App__le __Ap__p __Sto__re                                                                 |                                                                                                                                                          |
| __Spoti__fy                | __Mus__ic __streami__ng                | [__spoti__fy.__co__m](https://www.spotify.com/us/download/mac/)                         |                                                                                                                                                          |
| __Tim__er                  | __Pomodo__ro __an__d __timi__ng __stu__ff      | [__Gith__ub](https://github.com/michaelvillar/timer-app/releases)                   |                                                                                                                                                          |
| __Visu__al __Stud__io __Cod__e     | __Al__l-__purpo__se __tex__t-__edit__or        | [__cod__e.__visualstud__io.__co__m](https://code.visualstudio.com/Download)                 |                                                                                                                                                          |
| __Zoo__m                   | __No__n-__person__al __vid__eo __cal__ls       | [__zoo__m.__u__s/__downlo__ad](https://zoom.us/download)                                    |                                                                                                                                                          |
