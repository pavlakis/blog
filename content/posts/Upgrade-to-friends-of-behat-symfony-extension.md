---
title: "Upgrade to Friends of Behat Symfony Extension"
date: 2020-07-25T00:26:48+01:00
draft: false
tags: ['php', 'symfony', 'behat', 'symfony2extension', 'symfonyextension', 'friendsofphp']
---


[Behat](https://docs.behat.org/en/latest/) has been getting quite a bit of support recently (see: [The future of Behat in 2020](https://github.com/Behat/Behat/issues/1296))

Many of its extensions have been forked by [@FriendsOfBehat](https://github.com/FriendsOfBehat) and updated to better support current PHP versions.

In particular, the [Behat/Symfony2Extension](https://github.com/Behat/Symfony2Extension) has now been updated to support [Symfony](https://symfony.com/releases) ^4.4|^5.0.

The [FriendsOfBehat/SymfonyExtension](https://github.com/FriendsOfBehat/SymfonyExtension) now supports auto-wiring and auto-configuring your contexts.


## My Current Setup

The upgrade was done on a `Symfony 4.4` project, with the following `Behat` configuration:

```yml
# tests/behat/behat.yml

default:
  suites:
    api:
      paths:    [ "%paths.base%/features/api" ]
      contexts:
        - ApiContext:
            entityManager: '@doctrine.orm.default_entity_manager'
    web:
      paths:    [ "%paths.base%/features/hub" ]
      contexts:
        - WebContext:
            entityManager: '@doctrine.orm.default_entity_manager'
            routingExtension: '@twig.extension.routing'

  extensions:
    Behat\Symfony2Extension:
      kernel:
        bootstrap: "features/bootstrap/bootstrap.php"
        class: App\Kernel
    Behat\MinkExtension:
      goutte:
        guzzle_parameters:
          verify: false
```

And with the following `Behat` packages:

```json
        "behat/behat": "^3.4",
        "behat/mink": "^1.7",
        "behat/mink-browserkit-driver": "^1.3",
        "behat/mink-extension": "^2.3",
        "behat/mink-goutte-driver": "^1.2",
        "behat/symfony2-extension": "^2.1",
        "behatch/contexts": "^3.2",

```


## The Upgrade

Start by removing all `Behat` related packages:

```
composer remove "behat/*"
composer remove behatch/contexts
```

And then require all the new packages:


```
composer require --dev friends-of-behat/symfony-extension:^2.0
composer require --dev friends-of-behat/mink friends-of-behat/mink-extension friends-of-behat/mink-browserkit-driver
```

If using Flex, allow the recipes which will create the necessary files, including `config/services_test.yaml` and the `config/bundles.php` entry.


## The Configuration

The `config/services_test.yaml` will setup auto-wiring and auto-configuration for all the Behat contexts.

This is the file created by the recipe:

```yml

# config/services_test.yaml

services:
    _defaults:
        autowire: true
        autoconfigure: true

    App\Tests\Behat\:
        resource: '../tests/Behat/*'
        
```

My existing configuration is a little bit different, so I'll update this accordingly.

I already have my own namespace that I used for helper classes: `Blog\Acceptance\`, so can update the configuration file to the following:

```yml

# config/services_test.yaml

services:
    _defaults:
        autowire: true
        autoconfigure: true

    Blog\Acceptance\Context\:
        resource: '../tests/behat/features/bootstrap/*'

```

But I also have my `bootstrap.php` file in there and I don't want that loaded as a service. So I've moved it two levels up, and placed it under `tests/behat/bootstrap.php`.

With the updated namespace, I now need to do three things:

1. Add the namespace to `composer.json`


```json

    "autoload-dev": {
        "psr-4": {
            "Blog\\Acceptance\\Context\\" : "tests/behat/features/bootstrap"
        }
    },

```

2. Run `composer dump-autoload` to update the namespace within composer (in `autoload_psr4.php`)


3. Add the namespace to all my Context files in the `tests/behat/features/bootstrap/` folder.


`tests/behat/features/bootstrap/WebContext.php`

```php
<?php

namespace Blog\Acceptance\Context;

use Doctrine\ORM\EntityManagerInterface;
use Behat\MinkExtension\Context\MinkContext;

class ApiContext extends MinkContext
{
    public function __construct(EntityManagerInterface $entityManager)
    {
    }
}
```


## The behat.yml file

With the new packages, can now update the extensions on `behat.yml` to the following:

```yml
  extensions:
    FriendsOfBehat\SymfonyExtension:
      bootstrap: "tests/behat/bootstrap.php"
      kernel:
        class: ~
        path: ~
        environment: ~
        debug: ~
    Behat\MinkExtension:
      sessions:
        symfony:
          symfony: ~
          
```

Now that the context (services) are auto-configured and as they're namespaced, `behat.yml` should reflect that too.

That means that `ApiContext` becomes `Blog\Acceptance\ApiContext`, and `WebContext` becomes `Blog\Acceptance\WebContext`.


## Autowiring services

For my `WebContext` I'm using the `Symfony\Bridge\Twig\Extension\RoutingExtension` to add routes by name (like it is done on `twig`). But as it is not autowired, I'll add it in `services_test.yaml`:

```
Symfony\Bridge\Twig\Extension\RoutingExtension: "@twig.extension.routing"
```

With autowiring configured, I no longer need to add the dependencies on `behat.yml` and it now becomes:

```yml
default:
  suites:
    api:
      paths:    [ "%paths.base%/features/api" ]
      contexts:
        - Blog\Acceptance\ApiContext

    web:
      paths:    [ "%paths.base%/features/hub" ]
      contexts:
        - Blog\Acceptance\WebContext

  extensions:
    FriendsOfBehat\SymfonyExtension:
      bootstrap: "tests/behat/bootstrap.php"
      kernel:
        class: ~
        path: ~
        environment: ~
        debug: ~
    Behat\MinkExtension:
      sessions:
        symfony:
          symfony: ~

```

