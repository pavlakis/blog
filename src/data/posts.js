// Blog posts data
export const posts = [
  {
    slug: 'multiple-entity-managers-with-symfony',
    title: 'Multiple Entity Managers With Symfony',
    date: '2020-05-23T08:08:56+01:00',
    draft: false,
    tags: ['php', 'symfony', 'doctrine'],
    summary: 'I wanted to use different database connections when accessing content. My main use case was to have a read-only user (e.g. reading from a read-replica) and a user with write permissions to do inserts.',
    content: `
<p>I wanted to use different database connections when accessing content. My main use case was
to have a read-only user (e.g. reading from a read-replica) and a user with write permissions to do inserts.</p>

<p>This is something that both <a href="https://symfony.com/doc/4.4/doctrine/multiple_entity_managers.html" target="_blank" rel="noopener noreferrer">Symfony</a> and Doctrine have supported for some time.</p>

<h2>Doctrine config (doctrine.yaml)</h2>

<pre><code class="language-yaml">doctrine:
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
                        prefix: 'App\\Entity'
                        alias: App

            db_write:
                connection: db_write
                naming_strategy: doctrine.orm.naming_strategy.underscore_number_aware
                mappings:
                    App:
                        is_bundle: false
                        type: annotation
                        dir: '%kernel.project_dir%/src/Entity'
                        prefix: 'App\\Entity'
                        alias: App
</code></pre>

<p>This configuration is very similar to the one shown in the <a href="https://symfony.com/doc/4.4/doctrine/multiple_entity_managers.html" target="_blank" rel="noopener noreferrer">Symfony Docs</a>. The main difference is that I want all my entities to be used by both connections.</p>

<h3>The Repositories</h3>

<p>I recently started creating my repositories like this (which is the recommended approach):</p>

<pre><code class="language-php">&lt;?php

class EventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Event::class);
    }
}
</code></pre>

<p>By using the <code>ServiceEntityRepository</code> it is auto-magically autowired in my dependencies.</p>

<p>Unfortunately, as I wanted to use the same entities with different entity managers, this approach would not work. (see: <a href="https://github.com/doctrine/DoctrineBundle/issues/921" target="_blank" rel="noopener noreferrer">Issue with multiple entity managers</a>)</p>

<p>The approach that did work, was to extend <code>EntityRepository</code>:</p>

<pre><code class="language-php">&lt;?php

class EventRepository extends EntityRepository
{

}
</code></pre>

<h2>Manage Dependencies</h2>

<p>By no longer extending <code>ServiceEntityRepository</code> in the repository it means I now have to configure it manually.</p>

<p>Fortunately that is pretty straight-forward:</p>

<pre><code class="language-yaml">
    ### Read DB Access
    App\\Event\\Manager\\Read\\GetEvent:
        class: App\\Event\\Manager\\Read\\GetEvent
        arguments:
            - "@=service('doctrine.orm.default_entity_manager').getRepository('App:Event')"

    ### Write DB Access
    App\\Event\\Manager\\Write\\UpdateEvent:
        class: App\\Event\\Manager\\Write\\UpdateEvent
        arguments:
            - "@=service('doctrine.orm.db_write_entity_manager').getRepository('App:Event')"
</code></pre>

<p>The only additional step I had to do to get this configuration to work, was to install the <code>symfony/expression-language</code> package.</p>
`
  },
  {
    slug: 'upgrade-to-doctrine-migrations-3',
    title: 'Upgrade to Doctrine Migrations 3',
    date: '2020-08-20T23:32:51+01:00',
    draft: false,
    tags: ['php', 'symfony', 'doctrine', 'doctrine-migrations'],
    summary: 'Upgrading doctrine/migrations to version 3 (3.0.1) on a Symfony 4.4 project. Even when following semver a major version upgrade is expected to have backwards compatibility breaks.',
    content: `
<p>Upgrading <code>doctrine/migrations</code> to version 3 (<code>3.0.1</code>) on a Symfony 4.4 project.</p>

<p>Even when following <a href="https://semver.org" target="_blank" rel="noopener noreferrer">semver</a> a major version upgrade is expected to have backwards compatibility breaks.</p>

<p>Fortunately in these cases, the migration steps have been relatively easy.</p>

<h2>Upgrading the version</h2>

<p>First off, as my setup is through Flex, to upgrade the Doctrine Migrations to v3, I needed to do this through <code>symfony/orm-pack</code>.</p>

<p>To upgrade, I run: <code>composer update symfony/orm-pack --with-dependencies</code>.
This ended up updating 23 packages, including <code>doctrine/migrations</code>.</p>

<h2>The issue</h2>

<p>When composer finished updating, I saw the following error:</p>

<pre><code>Script cache:clear returned with error code 1
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
</code></pre>

<p>This meant that my current setup of <code>config/packages/doctrine_migrations.yaml</code> was no longer valid:</p>

<pre><code class="language-yaml">doctrine_migrations:
    dir_name: '%kernel.project_dir%/Migrations'
    namespace: DoctrineMigrations
</code></pre>

<h2>Understanding the setup</h2>

<p>The first place I looked at was the <code>TreeBuilder</code> which for this package was under <code>vendor/doctrine/doctrine-migrations-bundle/DependencyInjection/Configuration.php</code> (with PhpStorm can just click on <code>doctrine_migrations</code> in the <code>yaml</code> file and taken there, as long as you have the Symfony plugin installed).</p>

<p>There, looking at the <code>arrayNode</code> sections, I could see the different options available.</p>

<p>Having that as a reference, the <a href="https://www.doctrine-project.org/projects/doctrine-migrations/en/3.0/reference/configuration.html#configuration" target="_blank" rel="noopener noreferrer">Doctrine Migrations Documentation</a> was now easier to navigate.</p>

<h2>Making it work</h2>

<p>Matching my previous setup took a few more than 3 lines, but I think it is easy to follow:</p>

<pre><code class="language-yaml">doctrine_migrations:
    all_or_nothing: true
    check_database_platform: true

    migrations_paths:
        'DoctrineMigrations': '%kernel.project_dir%/Migrations'

    storage:
        table_storage:
            table_name: migration_versions
            version_column_name: version
            executed_at_column_name: executed_at
</code></pre>

<h2>Troubleshooting</h2>

<p>I run <code>bin/console doctrine:migrations:diff</code> first to see if everything still worked. But unfortunately I got the following error:</p>

<pre><code>The metadata storage is not up to date, please run the sync-metadata-storage command to fix this issue.
</code></pre>

<p>Running <code>bin/console doctrine:migrations:migrate</code> worked and then all the other commands after this run fine too.</p>

<h2>References</h2>

<ul>
  <li><a href="https://www.doctrine-project.org/projects/doctrine-migrations/en/3.0/reference/configuration.html#configuration" target="_blank" rel="noopener noreferrer">Doctrine Migrations Documentation</a></li>
  <li><a href="https://symfony.com/doc/3.0.x/bundles/DoctrineMigrationsBundle/index.html" target="_blank" rel="noopener noreferrer">Symfony Doctrine Migrations Bundle Documentation</a></li>
</ul>
`
  },
  {
    slug: 'upgrade-to-friends-of-behat-symfony-extension',
    title: 'Upgrade to Friends of Behat Symfony Extension',
    date: '2020-07-25T00:26:48+01:00',
    draft: false,
    tags: ['php', 'symfony', 'behat', 'symfony2extension', 'symfonyextension', 'friendsofphp'],
    summary: 'Behat has been getting quite a bit of support recently. Many of its extensions have been forked by @FriendsOfBehat and updated to better support current PHP versions.',
    content: `
<p><a href="https://docs.behat.org/en/latest/" target="_blank" rel="noopener noreferrer">Behat</a> has been getting quite a bit of support recently (see: <a href="https://github.com/Behat/Behat/issues/1296" target="_blank" rel="noopener noreferrer">The future of Behat in 2020</a>)</p>

<p>Many of its extensions have been forked by <a href="https://github.com/FriendsOfBehat" target="_blank" rel="noopener noreferrer">@FriendsOfBehat</a> and updated to better support current PHP versions.</p>

<p>In particular, the <a href="https://github.com/Behat/Symfony2Extension" target="_blank" rel="noopener noreferrer">Behat/Symfony2Extension</a> has now been updated to support <a href="https://symfony.com/releases" target="_blank" rel="noopener noreferrer">Symfony</a> ^4.4|^5.0.</p>

<p>The <a href="https://github.com/FriendsOfBehat/SymfonyExtension" target="_blank" rel="noopener noreferrer">FriendsOfBehat/SymfonyExtension</a> now supports auto-wiring and auto-configuring your contexts.</p>

<h2>My Current Setup</h2>

<p>The upgrade was done on a <code>Symfony 4.4</code> project, with the following <code>Behat</code> configuration:</p>

<pre><code class="language-yml"># tests/behat/behat.yml

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
    Behat\\Symfony2Extension:
      kernel:
        bootstrap: "features/bootstrap/bootstrap.php"
        class: App\\Kernel
    Behat\\MinkExtension:
      goutte:
        guzzle_parameters:
          verify: false
</code></pre>

<p>And with the following <code>Behat</code> packages:</p>

<pre><code class="language-json">"behat/behat": "^3.4",
"behat/mink": "^1.7",
"behat/mink-browserkit-driver": "^1.3",
"behat/mink-extension": "^2.3",
"behat/mink-goutte-driver": "^1.2",
"behat/symfony2-extension": "^2.1",
"behatch/contexts": "^3.2",
</code></pre>

<h2>The Upgrade</h2>

<p>Start by removing all <code>Behat</code> related packages:</p>

<pre><code>composer remove "behat/*"
composer remove behatch/contexts
</code></pre>

<p>And then require all the new packages:</p>

<pre><code>composer require --dev friends-of-behat/symfony-extension:^2.0
composer require --dev friends-of-behat/mink friends-of-behat/mink-extension friends-of-behat/mink-browserkit-driver
</code></pre>

<p>If using Flex, allow the recipes which will create the necessary files, including <code>config/services_test.yaml</code> and the <code>config/bundles.php</code> entry.</p>

<h2>The Configuration</h2>

<p>The <code>config/services_test.yaml</code> will setup auto-wiring and auto-configuration for all the Behat contexts.</p>

<p>This is the file created by the recipe:</p>

<pre><code class="language-yml"># config/services_test.yaml

services:
    _defaults:
        autowire: true
        autoconfigure: true

    App\\Tests\\Behat\\:
        resource: '../tests/Behat/*'
</code></pre>

<p>My existing configuration is a little bit different, so I'll update this accordingly.</p>

<p>I already have my own namespace that I used for helper classes: <code>Blog\\Acceptance\\</code>, so can update the configuration file to the following:</p>

<pre><code class="language-yml"># config/services_test.yaml

services:
    _defaults:
        autowire: true
        autoconfigure: true

    Blog\\Acceptance\\Context\\:
        resource: '../tests/behat/features/bootstrap/*'
</code></pre>

<p>But I also have my <code>bootstrap.php</code> file in there and I don't want that loaded as a service. So I've moved it two levels up, and placed it under <code>tests/behat/bootstrap.php</code>.</p>

<p>With the updated namespace, I now need to do three things:</p>

<ol>
  <li>Add the namespace to <code>composer.json</code></li>
</ol>

<pre><code class="language-json">"autoload-dev": {
    "psr-4": {
        "Blog\\\\Acceptance\\\\Context\\\\": "tests/behat/features/bootstrap"
    }
},
</code></pre>

<ol start="2">
  <li>Run <code>composer dump-autoload</code> to update the namespace within composer (in <code>autoload_psr4.php</code>)</li>
  <li>Add the namespace to all my Context files in the <code>tests/behat/features/bootstrap/</code> folder.</li>
</ol>

<p><code>tests/behat/features/bootstrap/WebContext.php</code></p>

<pre><code class="language-php">&lt;?php

namespace Blog\\Acceptance\\Context;

use Doctrine\\ORM\\EntityManagerInterface;
use Behat\\MinkExtension\\Context\\MinkContext;

class ApiContext extends MinkContext
{
    public function __construct(EntityManagerInterface $entityManager)
    {
    }
}
</code></pre>

<h2>The behat.yml file</h2>

<p>With the new packages, can now update the extensions on <code>behat.yml</code> to the following:</p>

<pre><code class="language-yml">extensions:
    FriendsOfBehat\\SymfonyExtension:
      bootstrap: "tests/behat/bootstrap.php"
      kernel:
        class: ~
        path: ~
        environment: ~
        debug: ~
    Behat\\MinkExtension:
      sessions:
        symfony:
          symfony: ~
</code></pre>

<p>Now that the context (services) are auto-configured and as they're namespaced, <code>behat.yml</code> should reflect that too.</p>

<p>That means that <code>ApiContext</code> becomes <code>Blog\\Acceptance\\ApiContext</code>, and <code>WebContext</code> becomes <code>Blog\\Acceptance\\WebContext</code>.</p>

<h2>Autowiring services</h2>

<p>For my <code>WebContext</code> I'm using the <code>Symfony\\Bridge\\Twig\\Extension\\RoutingExtension</code> to add routes by name (like it is done on <code>twig</code>). But as it is not autowired, I'll add it in <code>services_test.yaml</code>:</p>

<pre><code class="language-yml">Symfony\\Bridge\\Twig\\Extension\\RoutingExtension: "@twig.extension.routing"
</code></pre>

<p>With autowiring configured, I no longer need to add the dependencies on <code>behat.yml</code> and it now becomes:</p>

<pre><code class="language-yml">default:
  suites:
    api:
      paths:    [ "%paths.base%/features/api" ]
      contexts:
        - Blog\\Acceptance\\ApiContext

    web:
      paths:    [ "%paths.base%/features/hub" ]
      contexts:
        - Blog\\Acceptance\\WebContext

  extensions:
    FriendsOfBehat\\SymfonyExtension:
      bootstrap: "tests/behat/bootstrap.php"
      kernel:
        class: ~
        path: ~
        environment: ~
        debug: ~
    Behat\\MinkExtension:
      sessions:
        symfony:
          symfony: ~
</code></pre>
`
  }
]

