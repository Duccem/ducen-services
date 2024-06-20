import { Logger } from '@ducen/shared';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { CompositePropagator, W3CBaggagePropagator, W3CTraceContextPropagator } from '@opentelemetry/core';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import * as process from 'process';

export default function startTracing(serviceName: string, exporterUrl: string, logger: Logger) {
  const openTelemetrySDK = new NodeSDK({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: serviceName,
    }),
    metricReader: new PrometheusExporter({ port: 8081 }),
    spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter({ url: exporterUrl })) as any,
    contextManager: new AsyncLocalStorageContextManager(),
    instrumentations: [getNodeAutoInstrumentations()],
    textMapPropagator: new CompositePropagator({
      propagators: [
        new W3CTraceContextPropagator(),
        new W3CBaggagePropagator(),
        new B3Propagator(),
        new B3Propagator({
          injectEncoding: B3InjectEncoding.MULTI_HEADER,
        }),
      ],
    }),
  });
  openTelemetrySDK.start();
  logger.log('OpenTelemetry SDK started');
  process.on('SIGTERM', () => {
    openTelemetrySDK
      .shutdown()
      .then(
        () => logger.log('OpenTelemetry SDK shut down successfully'),
        (err) => logger.error('OpenTelemetry SDK shutdown failed', err),
      )
      .finally(() => process.exit(0));
  });
}

// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
