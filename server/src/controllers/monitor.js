import Monitor from '../models/Monitor';

let monitor;

export function getLoad(req, res, next) {
    if (!monitor) {
        // return quiet response
        return res.status(402).json({
            message: 'Monitor is not running',
        });
    }
    res.status(200).json({
        monitor: {
            load: monitor.getLoad(),
        },
    });
}

export function startMonitor(req, res, next) {
    const { duration, interval } = req.body;

    if (monitor) {
        monitor.stop();
        monitor = null;
    }
    if (!monitor) {
        monitor = new Monitor({
            duration: Number(duration) || 10 * 60 * 1000,
            interval: Number(interval) || 10 * 1000,
        });
    }
    monitor.start();
    res.status(200).json({
        message: 'Monitor started successfully',
    });
}

export function stopMonitor(req, res, next) {
    if (!monitor) {
        // return quiet response
        return res.status(402).json({
            message: 'Monitor is not running',
        });
    }
    monitor.stop();
    monitor = null;

    res.status(200).json({
        message: 'Monitor stopped successfully',
    });
}
