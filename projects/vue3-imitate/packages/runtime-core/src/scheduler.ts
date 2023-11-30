let isFlushingPending = false
const pendingPreFlushCbs: Function[] = []

const resolvedPromise: Promise<any> = Promise.resolve()
let currentFlushPromise: Promise<void> | null = null

export function queuePreFlushCb(cb: Function) {
  queueCb(cb, pendingPreFlushCbs)
}

function queueCb(cb: Function, pendingQueue: Function[]) {
  pendingQueue.push(cb)
  queueFlush()
}

function queueFlush() {
  if (!isFlushingPending) {
    isFlushingPending = true
    currentFlushPromise = resolvedPromise.then(flushJobs)
  }
}

function flushJobs() {
  isFlushingPending = false
  flushPreFlushCbs()
}

export function flushPreFlushCbs() {
  if (pendingPreFlushCbs.length) {
    let activePreFlushCbs = [...new Set(pendingPreFlushCbs)]
    pendingPreFlushCbs.length = 0
    for (let i = 0; i < activePreFlushCbs.length; i++) {
      activePreFlushCbs[i]()
    }
  }
}
