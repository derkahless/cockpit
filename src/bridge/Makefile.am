
noinst_LIBRARIES += \
	libcockpit-bridge.a \
	$(NULL)

libcockpit_bridge_METRICS = \
	src/bridge/cockpitblocksamples.c \
	src/bridge/cockpitblocksamples.h \
	src/bridge/cockpitcgroupsamples.c \
	src/bridge/cockpitcgroupsamples.h \
	src/bridge/cockpitcpusamples.c \
	src/bridge/cockpitcpusamples.h \
	src/bridge/cockpitdisksamples.c \
	src/bridge/cockpitdisksamples.h \
	src/bridge/cockpitinternalmetrics.c \
	src/bridge/cockpitinternalmetrics.h \
	src/bridge/cockpitmemorysamples.c \
	src/bridge/cockpitmemorysamples.h \
	src/bridge/cockpitmetrics.c \
	src/bridge/cockpitmetrics.h \
	src/bridge/cockpitmountsamples.c \
	src/bridge/cockpitmountsamples.h \
	src/bridge/cockpitnetworksamples.c \
	src/bridge/cockpitnetworksamples.h \
	src/bridge/cockpitsamples.c \
	src/bridge/cockpitsamples.h \
	$(NULL)

libcockpit_bridge_a_SOURCES = \
	src/bridge/cockpitconnect.c \
	src/bridge/cockpitconnect.h \
	src/bridge/cockpitdbuscache.c \
	src/bridge/cockpitdbuscache.h \
	src/bridge/cockpitdbusinternal.c \
	src/bridge/cockpitdbusinternal.h \
	src/bridge/cockpitdbusjson.c \
	src/bridge/cockpitdbusjson.h \
	src/bridge/cockpitdbusmachines.c \
	src/bridge/cockpitdbusmeta.c \
	src/bridge/cockpitdbusmeta.h \
	src/bridge/cockpitdbusprocess.c \
	src/bridge/cockpitdbusrules.c \
	src/bridge/cockpitdbusrules.h \
	src/bridge/cockpitdbussetup.c \
	src/bridge/cockpitdbususer.c \
	src/bridge/cockpitechochannel.c \
	src/bridge/cockpitechochannel.h \
	src/bridge/cockpitfslist.c \
	src/bridge/cockpitfslist.h \
	src/bridge/cockpitfsread.c \
	src/bridge/cockpitfsread.h \
	src/bridge/cockpitfsreplace.c \
	src/bridge/cockpitfsreplace.h \
	src/bridge/cockpitfswatch.c \
	src/bridge/cockpitfswatch.h \
	src/bridge/cockpithttpstream.c \
	src/bridge/cockpithttpstream.h \
	src/bridge/cockpitinteracttransport.c \
	src/bridge/cockpitinteracttransport.h \
	src/bridge/cockpitnullchannel.c \
	src/bridge/cockpitnullchannel.h \
	src/bridge/cockpitpackages.c \
	src/bridge/cockpitpackages.h \
	src/bridge/cockpitpacketchannel.c \
	src/bridge/cockpitpacketchannel.h \
	src/bridge/cockpitpaths.c \
	src/bridge/cockpitpaths.h \
	src/bridge/cockpitpeer.c \
	src/bridge/cockpitpeer.h \
	src/bridge/cockpitpipechannel.c \
	src/bridge/cockpitpipechannel.h \
	src/bridge/cockpitpolkitagent.c \
	src/bridge/cockpitpolkitagent.h \
	src/bridge/cockpitrouter.c \
	src/bridge/cockpitrouter.h \
	src/bridge/cockpitstream.c \
	src/bridge/cockpitstream.h \
	src/bridge/cockpitwebsocketstream.c \
	src/bridge/cockpitwebsocketstream.h \
	$(libcockpit_bridge_METRICS) \
	$(NULL)

libcockpit_bridge_a_CFLAGS = \
	-I$(srcdir)/src/bridge \
	-DG_LOG_DOMAIN=\"cockpit-bridge\" \
	$(COCKPIT_BRIDGE_CFLAGS) \
	$(NULL)

libcockpit_bridge_LIBS = \
	libcockpit-bridge.a \
	libcockpit-common.a \
	libwebsocket.a \
	$(COCKPIT_BRIDGE_LIBS) \
	$(NULL)

# -----------------------------------------------------------------------------

bin_PROGRAMS += cockpit-bridge

cockpit_bridge_SOURCES = src/bridge/bridge.c
cockpit_bridge_CFLAGS = \
	-I$(srcdir)/src/bridge \
	-DG_LOG_DOMAIN=\"cockpit-bridge\" \
	$(COCKPIT_BRIDGE_CFLAGS) \
	$(NULL)
cockpit_bridge_LDADD = $(libcockpit_bridge_LIBS)

libexec_PROGRAMS += cockpit-askpass

cockpit_askpass_SOURCES = src/bridge/askpass.c
cockpit_askpass_CFLAGS = \
	-I$(srcdir)/src/bridge \
	-DG_LOG_DOMAIN=\"cockpit-askpass\" \
	$(COCKPIT_BRIDGE_CFLAGS) \
	$(NULL)
cockpit_askpass_LDADD = $(libcockpit_bridge_LIBS)

EXTRA_DIST += \
	src/bridge/cockpit.pam.insecure \
	$(NULL)

# -----------------------------------------------------------------------------
# TESTS

BRIDGE_CHECKS = \
	test-paths \
	test-rules \
	test-pipe-channel \
	test-packet-channel \
	test-packages \
	test-peer \
	test-dbus-meta \
	test-fs \
	test-metrics \
	test-connect \
	test-stream \
	test-httpstream \
	test-setup \
	test-websocketstream \
	test-process \
	test-bridge \
	test-router \
	$(NULL)

mock_bridge_SOURCES = src/bridge/mock-bridge.c
mock_bridge_CFLAGS = \
	-DG_LOG_DOMAIN=\"mock-bridge\" \
	$(COCKPIT_BRIDGE_CFLAGS) \
	$(NULL)
mock_bridge_LDADD = $(libcockpit_bridge_LIBS)

test_bridge_SOURCES = src/bridge/test-bridge.c
test_bridge_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_bridge_LDADD = $(libcockpit_bridge_LIBS)

test_connect_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_connect_SOURCES = src/bridge/test-connect.c \
	src/common/mock-transport.c src/common/mock-transport.h
test_connect_LDADD = $(libcockpit_bridge_LIBS)

test_dbus_meta_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_dbus_meta_SOURCES = src/bridge/test-dbus-meta.c
test_dbus_meta_LDADD = $(libcockpit_bridge_LIBS)

test_packages_SOURCES = src/bridge/test-packages.c \
	src/common/mock-transport.c src/common/mock-transport.h
test_packages_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_packages_LDADD = $(libcockpit_bridge_LIBS)

test_paths_SOURCES = src/bridge/test-paths.c
test_paths_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_paths_LDADD = $(libcockpit_bridge_LIBS)

test_peer_SOURCES = src/bridge/test-peer.c \
	src/common/mock-transport.c src/common/mock-transport.h
test_peer_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_peer_LDADD = $(libcockpit_bridge_LIBS)

test_router_SOURCES = src/bridge/test-router.c \
	src/common/mock-channel.c src/common/mock-channel.h \
	src/common/mock-transport.c src/common/mock-transport.h
test_router_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_router_LDADD = $(libcockpit_bridge_LIBS)


test_rules_SOURCES = src/bridge/test-rules.c
test_rules_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_rules_LDADD = $(libcockpit_bridge_LIBS)

test_setup_SOURCES = src/bridge/test-setup.c
test_setup_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_setup_LDADD = $(libcockpit_bridge_LIBS)

test_stream_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_stream_SOURCES = src/bridge/test-stream.c \
	src/common/mock-io-stream.c src/common/mock-io-stream.h \
	src/common/mock-pressure.c src/common/mock-pressure.h
test_stream_LDADD = $(libcockpit_bridge_LIBS)

test_process_SOURCES = src/bridge/test-process.c
test_process_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_process_LDADD = $(libcockpit_bridge_LIBS)

test_packet_channel_SOURCES = \
	src/bridge/test-packet-channel.c \
	src/common/mock-transport.c src/common/mock-transport.h
test_packet_channel_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_packet_channel_LDADD = $(libcockpit_bridge_LIBS)

test_pipe_channel_SOURCES = \
	src/bridge/test-pipe-channel.c \
	src/common/mock-transport.c src/common/mock-transport.h
test_pipe_channel_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_pipe_channel_LDADD = $(libcockpit_bridge_LIBS)

test_fs_SOURCES = \
	src/bridge/test-fs.c \
	src/common/mock-transport.c src/common/mock-transport.h
test_fs_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_fs_LDADD = $(libcockpit_bridge_LIBS)

test_metrics_SOURCES = \
	src/bridge/test-metrics.c \
	src/common/mock-transport.c src/common/mock-transport.h
test_metrics_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_metrics_LDADD = $(libcockpit_bridge_LIBS) -lm

test_httpstream_SOURCES = \
	src/bridge/test-httpstream.c \
	src/common/mock-transport.c src/common/mock-transport.h
test_httpstream_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_httpstream_LDADD = $(libcockpit_bridge_LIBS) -ldl

test_websocketstream_SOURCES = \
	src/bridge/test-websocketstream.c \
	src/common/mock-transport.c src/common/mock-transport.h
test_websocketstream_CFLAGS = $(libcockpit_bridge_a_CFLAGS)
test_websocketstream_LDADD = $(libcockpit_bridge_LIBS) -ldl

noinst_PROGRAMS += $(BRIDGE_CHECKS) mock-bridge
TESTS += $(BRIDGE_CHECKS)

EXTRA_DIST += \
	src/bridge/mock-resource \
	src/bridge/mock-setup \
	src/bridge/mock-pmda.c \
	src/bridge/mock-pmns \
	src/bridge/mock-client.crt \
	src/bridge/mock-client.key \
	src/bridge/mock-server.crt \
	src/bridge/mock-server.key \
	$(NULL)

# -----------------------------------------------------------------------------
# polkit

polkitdir        = $(datadir)/polkit-1/actions
polkit_in_files  = src/bridge/org.cockpit-project.cockpit-bridge.policy.in
polkit_DATA = $(polkit_in_files:.policy.in=.policy)

# gettext-domain= must only occur on C strings, not translated ones
%.policy: %.policy.in $(PO_FILES)
	$(AM_V_GEN) $(INTLTOOL_MERGE) -q -x $(top_srcdir)/po $< - | sed '/xml:lang=/ s/\ gettext-domain=".*"//' > $@

EXTRA_DIST += $(polkit_in_files)
CLEANFILES += $(polkit_DATA)

prepare-po-bridge-policy: $(polkit_in_files)
	cp $< .
	$(AM_V_GEN) $(INTLTOOL_EXTRACT) -l --type=gettext/xml $(notdir $<)

prepare-po:: prepare-po-bridge-policy

# -----------------------------------------------------------------------------
# PCP

# make sure this ends up in the tarball, even with --disable-pcp
pmlogconf_files = src/bridge/pmlogconf/cockpit
EXTRA_DIST += $(pmlogconf_files)

if ENABLE_PCP

libexec_PROGRAMS += cockpit-pcp

noinst_LIBRARIES += libcockpit-pcp.a

libcockpit_pcp_a_SOURCES = \
	src/bridge/cockpitconnect.c \
	src/bridge/cockpitconnect.h \
	src/bridge/cockpitpcpmetrics.c \
	src/bridge/cockpitpcpmetrics.h \
	src/bridge/cockpitpeer.c \
	src/bridge/cockpitpeer.h \
	src/bridge/cockpitrouter.c \
	src/bridge/cockpitrouter.h \
	$(libcockpit_bridge_METRICS) \
	$(NULL)

libcockpit_pcp_a_CFLAGS = \
	-I$(srcdir)/src/bridge \
	-DG_LOG_DOMAIN=\"cockpit-pcp\" \
	$(COCKPIT_PCP_CFLAGS) \
	$(NULL)

libcockpit_pcp_LIBS = \
	libcockpit-pcp.a \
	libcockpit-common.a \
	$(COCKPIT_PCP_LIBS) \
	$(NULL)

cockpit_pcp_SOURCES = src/bridge/cockpitpcp.c
cockpit_pcp_CFLAGS = \
	-DG_LOG_DOMAIN=\"cockpit-pcp\" \
	$(COCKPIT_PCP_CFLAGS) \
	$(NULL)
cockpit_pcp_LDADD = $(libcockpit_pcp_LIBS)

pmlogconfdir = $(localstatedir)/lib/pcp/config/pmlogconf/tools
pmlogconf_DATA = $(pmlogconf_files)

BRIDGE_CHECKS += \
	test-pcp \
	test-pcp-archives \
	$(NULL)

noinst_DATA += mock-pmda.so

CLEANFILES += \
	mock-pmda.so \
	mock-archives/* \
	$(NULL)

# This is non-portable, but I don't feel like dragging in libtool just
# for this.
#
mock-pmda.so: src/bridge/mock-pmda.c
	$(AM_V_CCLD) $(CC) $(CFLAGS) -fPIC -shared \
		-DSRCDIR=\"$(abs_srcdir)\" \
		-o mock-pmda.so $(srcdir)/src/bridge/mock-pmda.c -lpcp_pmda -lpcp

test_pcp_SOURCES = \
	src/bridge/test-pcp.c \
	src/common/mock-transport.c src/common/mock-transport.h
test_pcp_CFLAGS = $(libcockpit_pcp_a_CFLAGS)
test_pcp_LDADD = $(libcockpit_pcp_LIBS) -ldl

test_pcp_archives_SOURCES = \
	src/bridge/test-pcp-archives.c \
	src/common/mock-transport.c src/common/mock-transport.h
test_pcp_archives_CFLAGS = $(libcockpit_pcp_a_CFLAGS)
test_pcp_archives_LDADD = $(libcockpit_pcp_LIBS) -ldl -lpcp_import

endif
