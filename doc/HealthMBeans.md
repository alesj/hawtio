# Health MBeans

Its very handy to add health checks to Java code running in a JVM and exposing those health checks over JMX. e.g. see the [dropwizard notes](http://dropwizard.codahale.com/getting-started/#creating-a-health-check) and the [metrics library health checks](http://metrics.codahale.com/getting-started/#health-checks).

This document outlines a Health check MBean convention that if folks adopt its then easier to discover and will be included in the Console's Health tab.

## Health MBean Convention

Create at least one MBean and register it with a JMX ObjectName including **Type=Health**.

For example an ObjectName could be

    org.apache.activemq:BrokerName=localhost,Type=Health

The MBean should then have these methods

* health() which returns a JMX compliant data structure such as tabular or composite data
* heathList() which returns a List&lt;Object&gt; or array of objects for use by tools like Jolokia that marshall objects nicely to JSON to avoid JMX's marshalling pain.

Each health status object should include the following properties if possible...

<table class="table">
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>healthId</td>
    <td>
      The unique ID of the kind of health check performed. We can then use this unique kind ID to generate useful UI tooling & descriptions.
      Ideally the code should be fully qualified in the same way as Java classes, such as org.apache.activemq.noConsumer
    </td>
  </tr>
  <tr>
    <td>
     level
    </td>
    <td>
      The severity level such as INFO, WARN, ERROR, CRITICAL to give some indication of how serious the problem is.
      INFO means its OK and healthy.
    </td>
  </tr>
  <tr>
    <td>
     message
    </td>
    <td>
      A textual description of the health check status.
    </td>
  </tr>
  <tr>
    <td>
    resource
    </td>
    <td>
      The JMX ObjectName of the thing causing the issue.
      If its hard to do, just include plenty of other properties to describe the resource/component that caused the issue
    </td>
  </tr>
</table>

### Examples

To show you how to implement a HealthMBean here are a few examples.

* [AciveMQ Health MBean](https://github.com/apache/activemq/blob/trunk/activemq-broker/src/main/java/org/apache/activemq/broker/jmx/HealthView.java#L52)
* [Fuse Fabric Health MBean](https://github.com/fusesource/fuse/blob/master/fabric/fabric-core/src/main/scala/org/fusesource/fabric/service/HealthCheck.java#L83)
