---
title: "Upgrade to Doctrine Migrations 3"
date: 2020-08-20T23:32:51+01:00
draft: false
---

Upgrading `doctrine/migrations` to version 3 (`3.0.1`) on a Symfony 4.4 project.

Even when following [semver](https://semver.org) a major version upgrade is expected to have backwards compatibility breaks.

Fortunately in these cases, the migration steps have been relatively easy.

## Upgrading the version

First off, as my setup is through Flex, to upgrade the Doctrine Migrations to v3, I needed to do this through `symfony/orm-pack`.

To upgrade, I run: `composer update symfony/orm-pack --with-dependencies`.
This ended up updating 23 packages, including `doctrine/migrations`.

## The issue

When composer finished updating, I saw the following error:

```
Script cache:clear returned with error code 1
!!  
!!  In ArrayNode.php line 327:
!!                                                                                 
!!    Unrecognized options "dir_name, namespace" under "doctrine_migrations". Ava  
!!    ilable options are "all_or_nothing", "check_database_platform", "connection  
!!    ", "custom_template", "em", "factories", "migrations", "migrations_paths",   
!!    "organize_migrations", "services", "storage".                                
!!                                                                                 
!!  
!!  
Script @auto-scripts was called via post-update-cmd
```

This meant that my current setup of `config/packages/doctrine_migrations.yaml` was no longer valid:

```yaml
doctrine_migrations:
    dir_name: '%kernel.project_dir%/Migrations'
    namespace: DoctrineMigrations
```
config/packages/doctrine_migrations.yaml

## Understanding the setup

The first place I looked at was the `TreeBuilder` which for this package was under `vendor/doctrine/doctrine-migrations-bundle/DependencyInjection/Configuration.php` (with PhpStorm can just click on `doctrine_migrations` in the `yaml` file and taken there, as long as you have the Symfony plugin installed).

There, looking at the `arrayNode` sections, I could see the different options available.

Having that as a reference, the [Doctrine Migrations Documentation](https://www.doctrine-project.org/projects/doctrine-migrations/en/3.0/reference/configuration.html#configuration) was now easier to navigate.

## Making it work

Matching my previous setup took a few more than 3 lines, but I think it is easy to follow:


```
doctrine_migrations:
    all_or_nothing: true
    check_database_platform: true

    migrations_paths:
        'DoctrineMigrations': '%kernel.project_dir%/Migrations'

    storage:
        table_storage:
            table_name: migration_versions
            version_column_name: version
            executed_at_column_name: executed_at
```
config/packages/doctrine_migrations.yaml


## Troubleshooting

I run `bin/console doctrine:migrations:diff` first to see if everything still worked. But unfortunately I got the following error:

```
 The metadata storage is not up to date, please run the sync-metadata-storage command to fix this issue.
```

Running `bin/console doctrine:migrations:migrate` worked and then all the other commands after this run fine too.

## References

* [Doctrine Migrations Documentation](https://www.doctrine-project.org/projects/doctrine-migrations/en/3.0/reference/configuration.html#configuration)
* [Symfony Doctrine Migrations Bundle Documentation](https://symfony.com/doc/3.0.x/bundles/DoctrineMigrationsBundle/index.html)
