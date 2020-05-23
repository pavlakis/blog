---
title: "Multiple Entity Managers With Symfony"
date: 2020-05-23T08:08:56+01:00
draft: true
tags: ['php', 'symfony', 'doctrine']
---

I wanted to use different database connections when accessing content. My main use case was
to have a read-only user (e.g. reading from a read-replica) and a user with write permissions to do inserts.

This is something that both [Symfony](https://symfony.com/doc/4.4/doctrine/multiple_entity_managers.html) and Doctrine have supported for some time. 

<!--more-->

## Doctrine config (doctrine.yaml)


```yaml
doctrine:
    dbal:
        default_connection: default
        connections:
            default:
                # configure these for your database server
                url: '%env(resolve:DATABASE_URL_READ)%'
                driver: 'pdo_mysql'
                server_version: '5.7'
                charset: utf8mb4
            db_write:
                # configure these for your database server
                url: '%env(resolve:DATABASE_URL_WRITE)%'
                driver: 'pdo_mysql'
                server_version: '5.7'
                charset: utf8mb4

    orm:
        auto_generate_proxy_classes: true
        default_entity_manager: default

        entity_managers:
            default:
                connection: default
                naming_strategy: doctrine.orm.naming_strategy.underscore_number_aware
                mappings:
                    App:
                        is_bundle: false
                        type: annotation
                        dir: '%kernel.project_dir%/src/Entity'
                        prefix: 'App\Entity'
                        alias: App

            db_write:
                connection: db_write
                naming_strategy: doctrine.orm.naming_strategy.underscore_number_aware
                mappings:
                    App:
                        is_bundle: false
                        type: annotation
                        dir: '%kernel.project_dir%/src/Entity'
                        prefix: 'App\Entity'
                        alias: App


```


This configuration is very similar to the one shown in the [Symfony Docs](https://symfony.com/doc/4.4/doctrine/multiple_entity_managers.html). The main difference is that I want all my entities to be used by both connections.

### The Repositories

I recently started creating my repositories like this (which is the recommended approach):

```php
<?php

class EventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Event::class);
    }
}
```

By using the `ServiceEntityRepository` it is auto-magically autowired in my dependencies.

Unfortunately, as I wanted to use the same entities with different entity managers, this approach would not work. (see: [Issue with multiple entity managers](https://github.com/doctrine/DoctrineBundle/issues/921))

The approach that did work, was to extend `EntityRepository`:


```php
<?php

class EventRepository extends EntityRepository
{

}
```

## Manage Dependencies

By no longer extending `ServiceEntityRepository` in the repository it means I now have to configure it manually.

Fortunately that is pretty straight-forward:

```yaml

    ### Read DB Access
    App\Event\Manager\Read\GetEvent:
        class: App\Event\Manager\Read\GetEvent
        arguments:
            - "@=service('doctrine.orm.default_entity_manager').getRepository('App:Event')"

    ### Write DB Access
    App\Event\Manager\Write\UpdateEvent:
        class: App\Event\Manager\Write\UpdateEvent
        arguments:
            - "@=service('doctrine.orm.db_write_entity_manager').getRepository('App:Event')"

```

The only additional step I had to do to get this configuration to work, was to install the `symfony/expression-language` package.